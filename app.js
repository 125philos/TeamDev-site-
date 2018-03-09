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
  database: 'soundcloud',
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
	//Вывод карточек исполнителей на главной странице
	app.get('/', function(req, res) {
		connection.query('SELECT * FROM performer', function(err, performer) {
		
	        if (err) throw err
	        connection.query('SELECT * FROM genre', function(err, genre) {
			
					if (err) throw err
					connection.query('SELECT * FROM country', function(err, country) {
					
						if (err) throw err
						res.render('index.twig', {
							// устанавливаем в представлении необходимые переменные
							performer: performer,
							genre: genre,
							country: country
					});
				})
			})
      	})
	});

	//Страница просмотра конкретного исполнителя
	app.get('/employee/:id_performer', function(req, res) {
		connection.query('SELECT * FROM performer where id_performer = ?', [req.params.id_performer], function(err, performer) {

	        if (err) throw err
			connection.query('SELECT * FROM genre', function(err, genre) {
			
				if (err) throw err
				connection.query('SELECT * FROM country', function(err, country) {
			
					if (err) throw err
						connection.query('SELECT * FROM album where id_performer = ?', [req.params.id_performer], function(err, album) {
						
							if (err) throw err
							res.render('employee.twig', {
								// устанавливаем в представлении необходимые переменные
								performer: performer[0],
								genre: genre,
								album: album,
								country: country
						});
					});
				})
			});	
      	})
	});
	
	//Удаление конкретного исполнителя
	app.post('/employee/:id_performer', function(req, res) {
		connection.query('DELETE FROM performer WHERE id_performer = ?', req.params.id_performer, function(err, result) {
		
			//Открываем главную страницу после удаления
			res.redirect('/');
		});
	});

	//Добавление нового исполнителя - подготовка страницы добавления
	app.get('/employee/', function(req, res) {
		connection.query('SELECT * FROM genre', function(err, genre) {
			
			if (err) throw err
			connection.query('SELECT * FROM country', function(err, country) {
			
				if (err) throw err
				res.render('add_employee.twig', {
					// устанавливаем в представлении необходимые переменные
					genre: genre,
					country: country
				});
			})
		})
	});
	
	//Добавление нового исполнителя
	app.post('/employee/', function(req, res) {
		//Cчитали значения, записали в пост
		var post = {
			performer_name: req.body.performer_name,
			performer_nickname: req.body.performer_nickname,
			performer_birthday: req.body.performer_birthday,
			performer_biography: req.body.performer_biography,
			performer_site: req.body.performer_site,
			performer_photo: req.body.performer_photo,
			id_genre: req.body.id_genre,
			id_country: req.body.id_country,
		}
			
		//Вставка поста
		connection.query('INSERT INTO performer SET ?', post, function(err, result) {
				//Открываем главную страницу после добавления
				res.redirect('/');
		});		
	});
	
	//Страница редактирования конкретного исполнителя (передача данных для редактирования)
	app.get('/employee/:id_performer/edit', function(req, res) {
		connection.query('SELECT * FROM genre', function(err, genre) {
		
			if (err) throw err
			connection.query('SELECT * FROM country', function(err, country) {
			
				if (err) throw err
				connection.query('SELECT * FROM performer WHERE id_performer = ?', [req.params.id_performer], function(err, performer) {
					if (err) throw err

					res.render('edit_employee.twig', {
						// устанавливаем в представлении необходимые переменные
						genre: genre,
						country: country,
						performer: performer[0],
					});			      	
				})	
			})
		})
	});
	
	//Собственно редактирование конкретного исполнителя
	app.post('/employeee/:id_performer', function(req, res) {
		var post = {
			performer_name: req.body.performer_name,
			performer_nickname: req.body.performer_nickname,
			performer_birthday: req.body.performer_birthday,
			performer_biography: req.body.performer_biography,
			performer_site: req.body.performer_site,
			performer_photo: req.body.performer_photo,
			id_genre: req.body.id_genre,
			id_country: req.body.id_country,
		}

		//Обновили значения
		connection.query('UPDATE performer SET ? WHERE id_performer = ?', [post, req.params.id_performer], function(err, result) {
			
				//Открываем главную страницу после добавления
				res.redirect('/');
		});
	});
	
    //Вешаем сервер на порт 
	app.listen(8082);
	console.log('Express server listening on port 8082');
})