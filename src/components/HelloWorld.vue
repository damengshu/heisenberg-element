<template>
  <div>
    <lb-table :column="tableData.column" :data="tableData.data" :row-class-name="rowClassName" height="300" border
      @register="register">
    </lb-table>
    <el-button @click="test">aaa</el-button>
  </div>
</template>

<script>
import LbTable from './lb-table/lb-table'
import { useTable } from '../hooks/useTable'

const [register, { setLoading }] = useTable()

export default {
  name: 'HelloWorld',
  components: {
    LbTable
  },
  data () {
    return {
      tableData: {
        column: [
          {
            prop: 'date',
            label: '日期'
          },
          {
            label: '配送信息',
            children: [
              {
                prop: 'name',
                label: '姓名'
              },
              {
                label: '地址',
                children: [
                  {
                    prop: 'province',
                    label: '省份'
                  },
                  {
                    prop: 'city',
                    label: '市区'
                  },
                  {
                    prop: 'address',
                    label: '地址'
                  }
                ]
              }
            ]
          }
        ],
        data: [
          {
            date: '2016-05-03',
            name: '王小虎1',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-02',
            name: '王小虎2',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-02',
            name: '王小虎3',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-02',
            name: '王小虎4',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-02',
            name: '王小虎5',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }
        ]
      }
    }
  },
  methods: {
    rowClassName ({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    register,
    test () {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 2000)
    }
  }
}
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
