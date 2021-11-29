<template>
  <div>
    <h2>Thông tin giao hàng</h2>
    <b-form @submit.prevent ref="form">
      <label for="input-name" class="big-label mb-0">Họ tên người nhận</label>
      <b-form-input id="input-name" v-model="form.name" required></b-form-input>
      <label for="input-phone" class="big-label mt-2 mb-0">Số điện thoại</label>
      <b-input
        ref="phoneInput"
        id="input-phone"
        v-model="form.phone"
        pattern="[0-9]{10,10}"
        oninvalid="this.setCustomValidity('Số điện thoại không hợp lệ')"
        oninput="this.setCustomValidity('')"
        type="tel"
        required
      ></b-input>
      <label for="input-name" class="big-label mb-0">Email</label>
      <b-form-input
        id="input-name"
        v-model="form.email"
        type="email"
        required
      ></b-form-input>
      <label class="big-label mt-2">Địa chỉ giao hàng</label>
      <b-row>
        <b-col sm>
          <label for="province-input" class="mb-0">Thành phố / Tỉnh</label>
          <b-form-select
            id="province-input"
            v-model="form.provinceID"
            :options="provinceList"
            @input="fetchDistrictList"
            ref="provinceInput"
            required
          ></b-form-select>
        </b-col>
        <b-col sm>
          <label for="district-input" class="mb-0">Quận / Huyện</label>
          <b-form-select
            id="district-input"
            v-model="form.districtID"
            :options="districtList"
            @input="fetchWardList"
            required
          ></b-form-select>
        </b-col>
        <b-col sm>
          <label for="ward-input" class="mb-0">Phường / Xã</label>
          <b-form-select
            id="ward-input"
            v-model="form.wardCode"
            :options="wardList"
            @input="getFee"
            required
          ></b-form-select>
        </b-col>
      </b-row>
      <label for="input-address" class="mt-2 mb-0">Số nhà và đường</label>
      <b-form-input
        id="input-address"
        v-model="form.address"
        required
      ></b-form-input>
      <label class="big-label mt-2">Hình thức giao hàng</label>
      <b-row>
        <b-col>
          <div
            :class="[
              form.serviceTypeID == 1 ? 'bordered' : 'borderless',
              serviceList.includes(1) ? '' : 'disabledbutton',
            ]"
            @click="changeService(1)"
          >
            Nhanh
            <i
              v-if="form.serviceTypeID != 1"
              class="fa fa-circle-o"
              style="float: right"
            ></i>
            <i v-else class="fa fa-check-circle-o" style="float: right"></i>
          </div>
        </b-col>
        <b-col>
          <div
            :class="[
              form.serviceTypeID == 2 ? 'bordered' : 'borderless',
              serviceList.includes(2) ? '' : 'disabledbutton',
            ]"
            @click="changeService(2)"
          >
            Tiêu chuẩn
            <i
              v-if="form.serviceTypeID != 2"
              class="fa fa-circle-o"
              style="float: right"
            ></i>
            <i v-else class="fa fa-check-circle-o" style="float: right"></i>
          </div>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>
<script>
export default {
  props: {
    cartCost: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      form: {
        name: '',
        address: '',
        phone: '',
        provinceID: null,
        districtID: null,
        wardCode: null,
        serviceTypeID: null,
        mail: null,
      },
      fullAddress: '',
      provinceList: [
        {
          value: null,
          text: 'Chọn thành phố/tỉnh',
        },
      ],
      districtList: [
        {
          value: null,
          text: 'Chọn quận/huyện',
        },
      ],
      wardList: [
        {
          value: null,
          text: 'Chọn phường/xã',
        },
      ],
      serviceList: [],
      fee: 0,
      phoneValid: true,
    }
  },
  async fetch() {
    await this.fetchProvinceList()
  },
  methods: {
    isValid() {
      return this.$refs.form.reportValidity()
    },
    async fetchProvinceList() {
      var res = await this.$axios.$get('/shipping/province')
      this.provinceList = [
        {
          value: null,
          text: 'Chọn thành phố/tỉnh',
        },
      ].concat(
        res.data.map((item) => ({
          value: item.id,
          text: item.name,
        }))
      )
    },
    async fetchDistrictList(province_id) {
      if (province_id) {
        var res = await this.$axios.$get('/shipping/district', {
          params: {
            province_id,
          },
        })
        this.districtList = [
          {
            value: null,
            text: 'Chọn quận/huyện',
          },
        ].concat(
          res.data.map((item) => ({
            value: item.id,
            text: item.name,
          }))
        )
      } else {
        this.districtList = [
          {
            value: null,
            text: 'Chọn quận/huyện',
          },
        ]
      }
      this.form.districtID = null
    },
    async fetchWardList(district_id) {
      this.fetchService(district_id)
      if (district_id) {
        var res = await this.$axios.$get('/shipping/ward', {
          params: {
            district_id,
          },
        })
        this.wardList = [
          {
            value: null,
            text: 'Chọn phường/xã',
          },
        ].concat(
          res.data.map((item) => ({
            value: item.ward_code,
            text: item.name,
          }))
        )
      } else {
        this.wardList = [
          {
            value: null,
            text: 'Chọn phường/xã',
          },
        ]
      }
      this.form.wardCode = null
    },
    async fetchService(district_id) {
      this.serviceList = []
      if (district_id) {
        var res = await this.$axios.$get('/shipping/available-services', {
          params: {
            to_district: district_id,
          },
        })
        if (res.data.some((service) => service.service_type_id == 1)) {
          this.serviceList.push(1)
        }
        if (res.data.some((service) => service.service_type_id == 2)) {
          this.serviceList.push(2)
        }
        this.form.serviceTypeID = this.serviceList[0]
      } else {
        this.form.serviceTypeID = null
      }
    },
    async getFee() {
      if (this.serviceList.length && this.form.wardCode) {
        var res = await this.$axios.$get('/shipping/fee', {
          params: {
            service_type_id: this.form.serviceTypeID,
            to_district_id: this.form.districtID,
            insurance_value: this.cartCost,
            to_ward_code: this.form.wardCode,
            weight: 2000,
            length: 10,
            width: 10,
            height: 10,
          },
        })
        this.fee = res.data
      } else {
        this.fee = 0
      }
    },
    changeService(serviceTypeID) {
      this.form.serviceTypeID = serviceTypeID
    },
    getProvinceName(provinceID) {
      return this.provinceList.find((province) => province.value == provinceID)
        .text
    },
    getDistrictName(districtID) {
      return this.districtList.find((district) => district.value == districtID)
        .text
    },
    getWardName(wardCode) {
      return this.wardList.find((ward) => ward.value == wardCode).text
    },
    updateFullAddress() {
      if (this.form.wardCode) {
        this.fullAddress = `${this.form.address}, ${this.getWardName(
          this.form.wardCode
        )}, ${this.getDistrictName(
          this.form.districtID
        )}, ${this.getProvinceName(this.form.provinceID)}, Việt Nam`
      } else {
        this.fullAddress = ''
      }
    },
    reportInvalidPhone() {
      this.$refs.phoneInput.setCustomValidity('Số điện thoại không hợp lệ')
      this.$refs.phoneInput.reportValidity()
    },
  },
  watch: {
    async 'form.serviceTypeID'(val) {
      await this.getFee()
    },
    fee(val) {
      this.$emit('update:fee', val)
    },
    'form.wardCode'(val) {
      this.updateFullAddress()
    },
    'form.address'(val) {
      this.updateFullAddress()
    },
  },
}
</script>
<style scoped>
.big-label {
  font-weight: bold;
  font-size: medium;
}
.bordered {
  vertical-align: center;
  padding: 5px;
  border: 1px solid green;
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
}
.borderless {
  vertical-align: center;
  padding: 5px;
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
}
.disabledbutton {
  pointer-events: none;
  opacity: 0.4;
  border: none;
}
</style>