`RTable` component provides an abstraction to React-Table and can help setup 
complex data tables.

### Components

`columns`: 

`[{
Header: '',
accessor: ''
}]`

Refer to React-Table docs for more attributes

`data`:

Data that needs to be mapped on the Columns.

`sortColumns`:
`{
columnName: true
}`

Columns that can be sorted

`setGlobalFilterValue`: 

For frontend searching

`style` : 

Custom CSS styles object

`pageSizes`:
`[10, 20, 30, 40]`

Array of page sizes that can be selected

`defaultPageSize`:

Page size selected by default

`manualPagination`:

Set to `true` if manual pagination is required

`paginationComponent`: JSX

Pagination Component to render, works with manual pagination

`recordIncreaseNumber`:

Number that will be added to the serial

`manualSortBy`: boolean

set to true if Manual Sorting is required

`columnHeaderClick`: function (column)

callback function return colum detail when a column is clicked.

`selectedSorts`: object
`{
columnName: -1
}`
Object of columns that are sorted.
