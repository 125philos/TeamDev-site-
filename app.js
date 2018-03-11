//Подчключаем необходимые компоненты: фреймворк express
var express = require('express'),
    //Компонент парсера HTML и JSON для него, 
    // подробнее: в туториале на сайте expressjs.com
    bodyParser = require('body-parser'),
	//Получаем объкт модуля mysql
    mysql = require('mysql'),
	//Шаблонизатор Twig	
    swig = require('twig'),
	//Cобственно класс приложения
	app = express();
	
//Из папки public будем отдавать статику: стили и скрипты для фронтенда
app.use(express.static(__dirname + '/public'));

//Создаем соединение с нашей базой данных
var connection = mysql.createConnection({
  multipleStatements: true,
  host     : 'localhost',
  user     : 'root',
  password : '',
  database: 'mubd'
});

//Главная программа
connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
	
	//Указываем каталог с представлениями
	app.engine('html', swig.renderFile);
	app.set('view engine', 'html');
	app.set('views', __dirname + '/view');
	
	//Используем body-parser для обработки запросов
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	
	//Теперь создаем маршруты
	//Вывод разные карточки на главной странице
	app.get('/', function(req, res) {
		connection.query('SELECT * FROM rastenie', function(err, rastenie) {
		
	        if (err) throw err
	        connection.query('SELECT * FROM typerastenie', function(err, typerastenie) {
			
					if (err) throw err
					connection.query('SELECT * FROM sortrastenie', function(err, sortrastenie) {
					
						if (err) throw err
						res.render('index.twig', {
							// устанавливаем в представлении необходимые переменные
                            rastenie: rastenie,
                            typerastenie: typerastenie,
                            sortrastenie: sortrastenie
					});
				})
			})
      	})
	});


	//Вывод списка растений
    app.get('/rasteniespisok/', function(req, res) {
        connection.query('SELECT * FROM rastenie', function(err, rastenie) {

            if (err) throw err
            connection.query('SELECT * FROM typerastenie', function(err, typerastenie) {

                if (err) throw err
                connection.query('SELECT * FROM sortrastenie', function(err, sortrastenie) {

                    if (err) throw err
                    res.render('rasteniespisok.twig', {
                        // устанавливаем в представлении необходимые переменные
                        rastenie: rastenie,
                        typerastenie: typerastenie,
                        sortrastenie: sortrastenie
                    });
                })
            })
        })
    });

    //Страница просмотра конкретного растения
    app.get('/rasteniespisok/:id_Rastenie', function(req, res) {
        connection.query('SELECT * FROM rastenie where id_Rastenie = ?', [req.params.id_Rastenie], function(err, rastenie) {

            if (err) throw err
            connection.query('SELECT * FROM typerastenie', function(err, typerastenie) {

                if (err) throw err
                connection.query('SELECT * FROM sortrastenie', function(err, sortrastenie) {

                        if (err) throw err
                        res.render('rastenie.twig', {
                            // устанавливаем в представлении необходимые переменные
                            rastenie: rastenie[0],
                            typerastenie: typerastenie,
                            sortrastenie: sortrastenie
                        });

                })
            });
        })
    });

    //Страница редактирования конкретного растения (передача данных для редактирования)
    app.get('/rasteniespisok/:id_Rastenie/edit', function(req, res) {
        connection.query('SELECT * FROM typerastenie', function(err, typerastenie) {

            if (err) throw err
            connection.query('SELECT * FROM sortrastenie', function(err, sortrastenie) {

                if (err) throw err
                connection.query('SELECT * FROM rastenie WHERE id_Rastenie = ?', [req.params.id_Rastenie], function(err, rastenie) {
                    if (err) throw err

                    res.render('edit_rastenie.twig', {
                        // устанавливаем в представлении необходимые переменные
                        typerastenie: typerastenie,
                        sortrastenie: sortrastenie,
                        rastenie: rastenie[0]
                    });
                })
            })
        })
    });

    //Собственно редактирование конкретного растения
    app.post('/rasteniespisokk/:id_Rastenie', function(req, res) {
        var post = ({
            id_SortRastenie: req.body.id_SortRastenie,
            PhotoRastenie: req.body.PhotoRastenie,
            DateVisadkaRastenie: req.body.DateVisadkaRastenie,
            ColorRastenie: req.body.ColorRastenie,
            KolvoRastenie: req.body.KolvoRastenie,
            EffectiveProcentRastenie: req.body.EffectiveProcentRastenie,
            CommentRastenie: req.body.CommentRastenie,
            CenaRastenie: req.body.CenaRastenie
        });

        //Обновили значения
        connection.query('UPDATE rastenie SET ? WHERE id_Rastenie = ?', [post, req.params.id_Rastenie], function(err, result) {

            //Открываем главную страницу после добавления
            res.redirect('/rasteniespisok/');
        });
    });

    //Удаление конкретного растения
    app.post('/rasteniespisok/:id_Rastenie', function(req, res) {
        connection.query('DELETE FROM rastenie WHERE id_Rastenie = ?', req.params.id_Rastenie, function(err, result) {

            //Открываем главную страницу после удаления
            res.redirect('/rasteniespisok/');
        });
    });

    //Добавление нового растения - подготовка страницы добавления
    app.get('/rasteniespisokk/', function(req, res) {
        connection.query('SELECT * FROM typerastenie', function(err, typerastenie) {

            if (err) throw err
            connection.query('SELECT * FROM sortrastenie', function(err, sortrastenie) {

                if (err) throw err
                res.render('add_rastenie.twig', {
                    // устанавливаем в представлении необходимые переменные
                    typerastenie: typerastenie,
                    sortrastenie: sortrastenie
                });
            })
        })
    });

    //Добавление нового растения
    app.post('/rasteniespisok/', function(req, res) {
        //Cчитали значения, записали в пост
        var post = ({
            id_SortRastenie: req.body.id_SortRastenie,
            PhotoRastenie: req.body.PhotoRastenie,
            DateVisadkaRastenie: req.body.DateVisadkaRastenie,
            ColorRastenie: req.body.ColorRastenie,
            KolvoRastenie: req.body.KolvoRastenie,
            EffectiveProcentRastenie: req.body.EffectiveProcentRastenie,
            CommentRastenie: req.body.CommentRastenie,
            CenaRastenie: req.body.CenaRastenie
        });

        //Вставка поста
        connection.query('INSERT INTO rastenie SET ?', post, function(err, result) {
            //Открываем главную страницу после добавления
            res.redirect('/rasteniespisok/');
        });
    });

    //Вешаем сервер на порт 
	app.listen(8075);
	console.log('Express server listening on port 8075');
})