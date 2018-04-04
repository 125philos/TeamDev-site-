jQuery(document).ready(function(){
    var minlen = 3; // минимальная длина слова
    var paddingtop = 30; // отступ сверху при прокрутке
    var scrollspeed = 200; // время прокрутки
    var keyint = 1000; // интервал между нажатиями клавиш
    var term = '';
    var n = 0;
    var time_keyup = 0;
    var time_search = 0;

    jQuery('body').delegate('#spgo', 'click', function(){
        jQuery('body,html').animate({scrollTop: jQuery('span.highlight:first').offset().top-paddingtop}, scrollspeed); // переход к первому фрагменту
    });

    function dosearch() {
        term = jQuery('#spterm').val();
        jQuery('span.highlight').each(function(){ //удаляем старую подсветку
            jQuery(this).after(jQuery(this).html()).remove();
        });
        var t = '';
        jQuery('div#content').each(function(){ // в селекторе задаем область поиска
            jQuery(this).html(jQuery(this).html().replace(new RegExp(term, 'ig'), '<span class="highlight">$&</span>')); // выделяем найденные фрагменты
            n = jQuery('span.highlight').length; // количество найденных фрагментов
            console.log('n = '+n);
            if (n==0)
                jQuery('#spresult').html('Ничего не найдено');
            else
                jQuery('#spresult').html('Результатов: '+n+'. <span class="splink" id="spgo">Перейти</span>');
            if (n>1) // если больше одного фрагмента, то добавляем переход между ними
            {
                var i = 0;
                jQuery('span.highlight').each(function(i){
                    jQuery(this).attr('n', i++); // нумеруем фрагменты, более простого способа искать следующий элемент не нашел
                });
                jQuery('span.highlight').not(':last').attr({title: 'Нажмите, чтобы перейти к следующему фрагменту'}).click(function(){ // всем фрагментам, кроме последнего, добавляем подсказку
                    jQuery('body,html').animate({scrollTop: jQuery('span.highlight:gt('+jQuery(this).attr('n')+'):first').offset().top-paddingtop}, scrollspeed); // переход к следующему фрагменту
                });
                jQuery('span.highlight:last').attr({title: 'Нажмите, чтобы вернуться к форме поиска'}).click(function(){
                    jQuery('body,html').animate({scrollTop: jQuery('#spterm').offset().top-paddingtop}, scrollspeed); // переход к форме поиска
                });
            }
        });
    }

    jQuery('#spterm').keyup(function(){
        var d1 = new Date();
        time_keyup = d1.getTime();
        if (jQuery('#spterm').val()!=term) // проверяем, изменилась ли строка
            if (jQuery('#spterm').val().length>=minlen) { // проверяем длину строки
                setTimeout(function(){ // ждем следующего нажатия
                    var d2 = new Date();
                    time_search = d2.getTime();
                    if (time_search-time_keyup>=keyint) // проверяем интервал между нажатиями
                        dosearch(); // если все в порядке, приступаем к поиску
                }, keyint);
            }
            else
                jQuery('#spresult').html('&nbsp'); // если строка короткая, убираем текст из DIVа с результатом
    });

    if (window.location.hash!="") // бонус
    {
        var t = window.location.hash.substr(1, 50); // вырезаем текст
        jQuery('#spterm').val(t).keyup(); // вставляем его в форму поиска
        jQuery('#spgo').click(); // переходим к первому фрагменту
    }
});