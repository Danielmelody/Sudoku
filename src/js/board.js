function createSuduke(level) {
  var table = document.getElementById('board')
  var remind = document.getElementById('remind')
  table.innerHTML = ''
  var lastGrid
  var lastValue
  var lastColor = '#ccc'

  var logic = new sudokuLogic.Sudoku();
  logic.solve()
  logic.emitSuduku(level)
  var tbody = document.createElement('tbody')
  table.appendChild(tbody)
  for (var i = 0; i < 9; ++i) {
    tbody.insertRow(i)
    for (var j = 0; j < 9; ++j) {
      var cell = tbody.rows[i].insertCell(j)
      cell.i = i
      cell.j = j
      cell.hasSetted = false
      cell.preSet = false
      this.selected = false
      if (logic.board[i][j] !== 0) {
        cell.preSet = true
        cell.innerHTML = '<a class="text-preset">' + logic.board[i][j] + '</a>'
        cell.style.backgroundColor = '#ddd'
      } else {
        cell.innerHTML = ''
      }
      cell.onmouseover = function () {
        if (!this.preSet) {
          this.style.backgroundColor = 'white'
        }
      }

      cell.onmouseleave = function () {
        if (!this.preSet) {
          if (!this.hasSetted) {
            this.style.backgroundColor = '#ccc'
          }
        }
      }

      cell.ongiveup = function () {
        if (this.selected) {
          this.selected = false
          if (lastValue !== undefined) {
            this.innerHTML = lastValue
          }
          if (lastColor !== undefined) {
            this.style.backgroundColor = lastColor
          }
        }
      }

      cell.onclick = function (argument) {
        if (this.preSet) {
          return
        }
        if (!this.selected && lastGrid !== this) {
          this.selected = true
          if (lastGrid !== undefined) {
            lastGrid.ongiveup()
          }
          lastValue = this.innerHTML
          lastGrid = this
          this.innerHTML = ''

          if (this.hasSetted) {
            this.style.backgroundColor = '#a10000'
            this.hasSetted = true
          } else {
            this.style.backgroundColor = '#a10000'
            this.hasSetted = true
          }
          var self = this
          var ansSelector = document.createElement('table')
          ansSelector.setAttribute('class', 'ans')
          ansSelector.setAttribute('align', 'center')
          var ansTbody = document.createElement('tbody')
          ansSelector.appendChild(ansTbody)
          // var validList = logic.getValidList(this.i, this.j)
          for (var m = 0; m < 3; ++m) {
            ansTbody.insertRow(m)
            for (var n = 0; n < 3; ++n) {
              var option = ansTbody.rows[m].insertCell(n)
              if (logic.check(this.j, this.i, 3 * m + n + 1)) {
                option.setAttribute('class', 'option-valid')
                option.innerHTML = '<a class="option-text-valid">' + (3 * m + n + 1) + '</a>'
                option.onclick = (function () {
                  var cuCell = self
                  var value = 3 * m + n + 1
                  return function () {
                    cuCell.innerHTML = '<a class="text-setted">' + value + '</a>'
                    logic.fill(cuCell.j, cuCell.i, value)
                    if (logic.checkComplete()) {
                      remind.innerHTML = '<h1 class="text-setted">Succeed!</h1>'
                    }
                    cuCell.style.backgroundColor = 'white'
                    cuCell.selected = false
                  }
                })()
              } else {
                option.setAttribute('class', 'option-invalid')
                option.onmouseover = function () {
                  this.style.backgroundColor = '#a10000'
                }
                //option.innerHTML = '<a class="option-invalid">' + (3 * m + n + 1) + '</a>'
                //option.setAttribute('class', 'ans-invalid')
              }
            }
          }
          this.appendChild(ansSelector)
        }
        // cell.onclick =
      }
    }
  }
  document.body.appendChild(table)
}
