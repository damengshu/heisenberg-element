<template>
  <div class="lb-table" ref="table" v-loading="loading">
    <el-table ref="elTable" v-bind="tablePoprs" v-on="$listeners" :data="tablePoprs.data"
      :span-method="tablePoprs.merge ? tablePoprs.mergeMethod : tablePoprs.spanMethod">

      <div v-for="(item, index) in tablePoprs.column" :key="index">
        <lb-column v-bind="tablePoprs" :column="item">
          <template v-if="item.slot" v-slot:[item.slot]="{ slotScope }">
            <slot :name="item.slot" :slot-scope="slotScope" />
          </template>
        </lb-column>
      </div>

    </el-table>
    <el-pagination :style="{ 'margin-top': tablePoprs.paginationTop, 'text-align': tablePoprs.paginationAlign }"
      v-if="tablePoprs.pagination" v-bind="tablePoprs" :current-page.sync="tablePagination.currentPage"
      :page-size.sync="tablePagination.pageSize" :total="tablePoprs.total" @current-change="paginationCurrentChange"
      @size-change="paginationSizeChange" v-on="$listeners">
    </el-pagination>
  </div>
</template>

<script>
import LbColumn from './lb-column'

const tableAction = {
  clearSelection () {
    this.$refs.elTable.clearSelection()
  },
  toggleRowSelection (row, selected) {
    this.$refs.elTable.toggleRowSelection(row, selected)
  },
  toggleAllSelection () {
    this.$refs.elTable.toggleAllSelection()
  },
  toggleRowExpansion (row, expanded) {
    this.$refs.elTable.toggleRowExpansion(row, expanded)
  },
  setCurrentRow (row) {
    this.$refs.elTable.setCurrentRow(row)
  },
  clearSort () {
    this.$refs.elTable.clearSort()
  },
  clearFilter (columnKey) {
    this.$refs.elTable.clearFilter(columnKey)
  },
  doLayout () {
    this.$refs.elTable.doLayout()
  },
  sort (prop, order) {
    this.$refs.elTable.sort(prop, order)
  },
  getMergeArr (tableData, merge) {
    if (!merge) return
    this.mergeLine = {}
    this.mergeIndex = {}
    merge.forEach((item, k) => {
      tableData.forEach((data, i) => {
        if (i === 0) {
          this.mergeIndex[item] = this.mergeIndex[item] || []
          this.mergeIndex[item].push(1)
          this.mergeLine[item] = 0
        } else {
          if (data[item] === tableData[i - 1][item]) {
            this.mergeIndex[item][this.mergeLine[item]] += 1
            this.mergeIndex[item].push(0)
          } else {
            this.mergeIndex[item].push(1)
            this.mergeLine[item] = i
          }
        }
      })
    })
  },
  mergeMethod ({ row, column, rowIndex, columnIndex }) {
    const index = this.merge.indexOf(column.property)
    if (index > -1) {
      const _row = this.mergeIndex[this.merge[index]][rowIndex]
      const _col = _row > 0 ? 1 : 0
      return {
        rowspan: _row,
        colspan: _col
      }
    }
  },
  setLoading (state) {
    this.loading = state
  }

}

export default {
  name: 'lb-table',
  props: {
    column: Array,
    data: Array,
    spanMethod: Function,
    pagination: {
      type: Boolean,
      default: false
    },
    paginationTop: {
      type: String,
      default: '15px'
    },
    paginationAlign: {
      type: String,
      default: 'right'
    },
    api: {
      type: Function,
      default: null
    },
    merge: Array,
    resultField: {
      type: String,
      default: 'list'
    },
    totalField: {
      type: String,
      default: 'totalRow'
    },
    total: {
      type: Number,
      default: 0
    }
  },
  components: {
    LbColumn
  },
  data () {
    return {
      mergeLine: {},
      mergeIndex: {},
      loading: false,
      innerProps: {},
      tablePagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  created () {
    this.getMergeArr(this.data, this.merge)
  },
  async mounted () {
    this.$emit('register', this)
    if (this.api) {
      await this.getTableData()
    }
  },
  computed: {
    dataLength () {
      if (this.tablePoprs.data) {
        return this.tablePoprs.data.length
      } else {
        return 0
      }
    },
    tablePoprs: {
      get: function () {
        return {
          layout: 'total, sizes, prev, pager, next',
          ...this.$props,
          ...this.tablePagination,
          ...this.innerProps
        }
      },
      set: function (props) {
        this.innerProps = {
          ...this.innerProps,
          ...this.tablePagination,
          ...props
        }
      }
    }
  },
  methods: {
    ...tableAction,
    setProps (props) {
      this.innerProps = {
        ...this.innerProps,
        ...this.tablePagination,
        ...props
      }
    },
    async getTableData () {
      this.loading = true
      const { data } = this.tablePoprs.api && await this.tablePoprs.api({
        page: this.tablePagination.currentPage,
        limit: this.tablePagination.pageSize
      })
      if (this.tablePoprs.api) {
        const result = this.tablePoprs.resultField ? data[this.tablePoprs.resultField] : data
        if (this.tablePoprs.pagination) {
          const total = this.tablePoprs.totalField ? data[this.tablePoprs.totalField] : data
          this.tablePoprs = {
            data: result,
            total: total
          }
        }
      }
      this.loading = false
    },
    paginationCurrentChange (val) {
      this.tablePagination.currentPage = val
      this.$emit('p-current-change', val)
      this.getTableData()
    },
    paginationSizeChange (val) {
      this.$emit('p-size-change', val)
      this.tablePoprs = {
        pageSize: val
      }
      this.getTableData()
    }
  },
  watch: {
    merge () {
      this.getMergeArr(this.data, this.merge)
    },
    dataLength () {
      this.getMergeArr(this.data, this.merge)
    }
  }
}

</script>
