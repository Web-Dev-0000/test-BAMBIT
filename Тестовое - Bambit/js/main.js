// Модальное окно:
let modal = document.getElementById('myModal');


let btn = document.getElementById("myBtn");


let span = document.getElementsByClassName("close")[0];


btn.onclick = function() {
    modal.style.display = "block";
}


span.onclick = function() {
    modal.style.display = "none";
}


window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



// Драг&дроп
const cols = document.querySelectorAll('.item');
let dragSrcElement = null;

function handleDragStart(e){
  this.classList.add('selected');
  dragSrcElement = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e){
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}

function handleDragEnter(e){
  this.classList.add('over');
}

function handleDragLeave(e){
  this.classList.remove('over');
};

function handleDrop(e){
  e.stopPropagation();
  let notSameElement = dragSrcElement != this;
  
  if(notSameElement) {
    dragSrcElement.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  }
}

function handleDragEnd(e){
  cols.forEach(column => {
    let isOverElement = column.classList.contains('over');
    let isSelected = column.classList.contains('selected');
    
    if(isOverElement){
      column.classList.remove('over');
    }
    if(isSelected){
      column.classList.remove('selected');
    }
  });
}

cols.forEach( column => {
  column.addEventListener('dragstart', handleDragStart, false);
  column.addEventListener('dragover', handleDragOver, false);
  column.addEventListener('dragenter', handleDragEnter, false);
  column.addEventListener('dragleave', handleDragLeave, false);
  column.addEventListener('drop', handleDrop, false);
  column.addEventListener('dragend', handleDragEnd, false);
});


//  Селектор:
$('.select').each(function() {
  const _this = $(this),
      selectOption = _this.find('option'),
      selectOptionLength = selectOption.length,
      selectedOption = selectOption.filter(':selected'),
      duration = 450; // длительность анимации 

  _this.hide();
  _this.wrap('<div class="select"></div>');
  $('<div>', {
      class: 'new-select',
      text: _this.children('option:disabled').text()
  }).insertAfter(_this);

  const selectHead = _this.next('.new-select');
  $('<div>', {
      class: 'new-select__list'
  }).insertAfter(selectHead);

  const selectList = selectHead.next('.new-select__list');
  for (let i = 1; i < selectOptionLength; i++) {
      $('<div>', {
          class: 'new-select__item',
          html: $('<span>', {
              text: selectOption.eq(i).text()
          })
      })
      .attr('data-value', selectOption.eq(i).val())
      .appendTo(selectList);
  }

  const selectItem = selectList.find('.new-select__item');
  selectList.slideUp(0);
  selectHead.on('click', function() {
      if ( !$(this).hasClass('on') ) {
          $(this).addClass('on');
          selectList.slideDown(duration);

          selectItem.on('click', function() {
              let chooseItem = $(this).data('value');

              $('select').val(chooseItem).attr('selected', 'selected');
              selectHead.text( $(this).find('span').text() );

              selectList.slideUp(duration);
              selectHead.removeClass('on');
          });

      } else {
          $(this).removeClass('on');
          selectList.slideUp(duration);
      }
  });
});