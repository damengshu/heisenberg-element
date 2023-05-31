import { isEmptyObject } from './util'
function useTable (tableProps) {
  let tableInstance = null

  function register (instance) {
    tableInstance = instance
    if (!isEmptyObject(tableProps)) {
      tableInstance.setProps(tableProps)
    }
  }

  function getTableInstance () {
    return tableInstance
  }

  const methods = {
    setLoading: (state) => {
      getTableInstance().setLoading(state)
    },
    clearSelection () {
      getTableInstance().clearSelection()
    },
    toggleRowSelection (row, selected) {
      getTableInstance().toggleRowSelection(row, selected)
    },
    toggleAllSelection () {
      getTableInstance().toggleAllSelection()
    },
    toggleRowExpansion (row, expanded) {
      getTableInstance().toggleRowExpansion(row, expanded)
    },
    setCurrentRow (row) {
      getTableInstance().setCurrentRow(row)
    },
    clearSort () {
      getTableInstance().clearSort()
    },
    clearFilter (columnKey) {
      getTableInstance().clearFilter(columnKey)
    },
    doLayout () {
      getTableInstance().doLayout()
    },
    sort (prop, order) {
      getTableInstance().sort(prop, order)
    },
    paginationCurrentChange (val) {
      getTableInstance().paginationCurrentChange(val)
    },
    getMergeArr (tableData, merge) {
      getTableInstance().getMergeArr(tableData, merge)
    },
    async reLoad () {
      await getTableInstance().getTableData()
    }
  }

  return [register, methods]
}

export { useTable }
