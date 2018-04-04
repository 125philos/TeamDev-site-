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
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'muuu'
});

//Главная программа
connection.connect(function (err) {
    if (err) throw err
    console.log('You are now connected...')

    //Указываем каталог с представлениями
    app.engine('html', swig.renderFile);
    app.set('view engine', 'html');
    app.set('views', __dirname + '/view');

    //Используем body-parser для обработки запросов
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());


    ///////////////////////////////////////
    ////////Главная страница сайта/////////
    ///////////////////////////////////////

    //Получить главную страницу сайта
    app.get('/', function (req, res) {
        //Возвращает твиг главной страницы
        res.render('index.twig', {});
    });

    /////////////////////////
    ////////Растения/////////
    /////////////////////////

    //Вывод списка растений
    app.get('/rasteniespisok/', function (req, res) {
        connection.query('SELECT * FROM rastenie', function (err, rastenie) {

            if (err) throw err
            connection.query('SELECT * FROM typerastenie', function (err, typerastenie) {

                if (err) throw err
                connection.query('SELECT * FROM sortrastenie', function (err, sortrastenie) {

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

    //Страница просмотра конкретного растения + результаты дезинфекции
    app.get('/rasteniespisok/:id_Rastenie', function (req, res) {
        connection.query('SELECT * FROM rastenie where id_Rastenie = ?', [req.params.id_Rastenie], function (err, rastenie) {

            if (err) throw err
            connection.query('SELECT * FROM typerastenie', function (err, typerastenie) {

                if (err) throw err
                connection.query('SELECT * FROM sortrastenie', function (err, sortrastenie) {

                    if (err) throw err
                    connection.query('SELECT * FROM dezobsluzh', function (err, dezobsluzh) {

                        if (err) throw err
                        res.render('rastenie.twig', {
                            // устанавливаем в представлении необходимые переменные
                            rastenie: rastenie[0],
                            typerastenie: typerastenie,
                            sortrastenie: sortrastenie,
                            dezobsluzh: dezobsluzh
                        });
                    })
                })
            });
        })
    });

    //Страница редактирования конкретного растения (передача данных для редактирования)
    app.get('/rasteniespisok/:id_Rastenie/edit', function (req, res) {
        connection.query('SELECT * FROM typerastenie', function (err, typerastenie) {

            if (err) throw err
            connection.query('SELECT * FROM sortrastenie', function (err, sortrastenie) {

                if (err) throw err
                connection.query('SELECT * FROM rastenie WHERE id_Rastenie = ?', [req.params.id_Rastenie], function (err, rastenie) {
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
    app.post('/rasteniespisokk/:id_Rastenie', function (req, res) {
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
        connection.query('UPDATE rastenie SET ? WHERE id_Rastenie = ?', [post, req.params.id_Rastenie], function (err, result) {

            //Открываем главную страницу после добавления
            res.redirect('/rasteniespisok/');
        });
    });

    //Удаление конкретного растения
    app.post('/rasteniespisok/:id_Rastenie', function (req, res) {
        connection.query('DELETE FROM rastenie WHERE id_Rastenie = ?', req.params.id_Rastenie, function (err, result) {

            //Открываем главную страницу после удаления
            res.redirect('/rasteniespisok/');
        });
    });

    //Добавление нового растения - подготовка страницы добавления
    app.get('/rasteniespisokk/', function (req, res) {
        connection.query('SELECT * FROM typerastenie', function (err, typerastenie) {

            if (err) throw err
            connection.query('SELECT * FROM sortrastenie', function (err, sortrastenie) {

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
    app.post('/rasteniespisok/', function (req, res) {
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
        connection.query('INSERT INTO rastenie SET ?', post, function (err, result) {
            //Открываем главную страницу после добавления
            res.redirect('/rasteniespisok/');
        });
    });


    /////////////////////////
    ////////Животные/////////
    /////////////////////////

    //Теперь создаем маршруты
    //Вывод разные карточки на главной странице
    app.get('/', function (req, res) {
        connection.query('SELECT * FROM zver', function (err, zver) {

            if (err) throw err
            connection.query('SELECT * FROM typezver', function (err, typezver) {

                if (err) throw err
                connection.query('SELECT * FROM porodazver', function (err, porodazver) {

                    if (err) throw err
                    res.render('index.twig', {
                        // устанавливаем в представлении необходимые переменные
                        zver: zver,
                        typezver: typezver,
                        porodazver: porodazver
                    });
                })
            })
        })
    });

    //Вывод списка зверей
    app.get('/zverspisok/', function (req, res) {
        connection.query('SELECT * FROM zver', function (err, zver) {

            if (err) throw err
            connection.query('SELECT * FROM typezver', function (err, typezver) {

                if (err) throw err
                connection.query('SELECT * FROM porodazver', function (err, porodazver) {

                    if (err) throw err
                    res.render('zverspisok.twig', {
                        // устанавливаем в представлении необходимые переменные
                        zver: zver,
                        typezver: typezver,
                        porodazver: porodazver
                    });
                })
            })
        })
    });

    //Страница просмотра конкретного зверя + результаты ветеринарного обслуживания
    app.get('/zverspisok/:id_Zver', function (req, res) {
        connection.query('SELECT * FROM zver where id_Zver = ?', [req.params.id_Zver], function (err, zver) {

            if (err) throw err
            connection.query('SELECT * FROM typezver', function (err, typezver) {

                if (err) throw err
                connection.query('SELECT * FROM porodazver', function (err, porodazver) {

                    if (err) throw err
                    connection.query('SELECT * FROM vetobsluj', function (err, vetobsluj) {

                        if (err) throw err
                        res.render('zver.twig', {
                            // устанавливаем в представлении необходимые переменные
                            zver: zver[0],
                            typezver: typezver,
                            porodazver: porodazver,
                            vetobsluj: vetobsluj
                        });

                    })
                })
            });
        })
    });

    //Страница редактирования конкретного зверя (передача данных для редактирования)
    app.get('/zverspisok/:id_Zver/edit', function (req, res) {
        connection.query('SELECT * FROM typezver', function (err, typezver) {

            if (err) throw err
            connection.query('SELECT * FROM porodazver', function (err, porodazver) {

                if (err) throw err
                connection.query('SELECT * FROM zver WHERE id_Zver = ?', [req.params.id_Zver], function (err, zver) {
                    if (err) throw err

                    res.render('edit_zver.twig', {
                        // устанавливаем в представлении необходимые переменные
                        typezver: typezver,
                        porodazver: porodazver,
                        zver: zver[0]
                    });
                })
            })
        })
    });

    //Собственно редактирование конкретного зверя
    app.post('/zverspisok/:id_Zver', function (req, res) {
        var post = ({
            id_PorodaZver: req.body.id_PorodaZver,
            PhotoZver: req.body.PhotoZver,
            NameZver: req.body.NameZver,
            DateBirthday: req.body.DateBirthday,
            SexZver: req.body.SexZver,
            ColorZver: req.body.ColorZver,
            VesZver: req.body.VesZver,
            EffectiveProcentZver: req.body.EffectiveProcentZver,
            CommentZver: req.body.CommentZver,
            CenaZver: req.body.CenaZver
        });

        //Обновили значения
        connection.query('UPDATE zver SET ? WHERE id_Zver = ?', [post, req.params.id_Zver], function (err, result) {

            //Открываем главную страницу после добавления
            res.redirect('/zverspisok/');
        });
    });

    //Удаление конкретного зверя
    app.post('/zver/:id_Zver', function (req, res) {
        connection.query('DELETE FROM zver WHERE id_Zver = ?', req.params.id_Zver, function (err, result) {

            //Открываем главную страницу после удаления
            res.redirect('/zverspisok/');
        });
    });

    //Добавление нового зверя - подготовка страницы добавления
    app.get('/zverspisokcr', function (req, res) {
        connection.query('SELECT * FROM typezver', function (err, typezver) {

            if (err) throw err
            connection.query('SELECT * FROM porodazver', function (err, porodazver) {

                if (err) throw err
                res.render('add_zver.twig', {
                    // устанавливаем в представлении необходимые переменные
                    typezver: typezver,
                    porodazver: porodazver
                });
            })
        })
    });

    //Добавление нового зверя
    app.post('/zverspisok/', function (req, res) {
        //Cчитали значения, записали в пост
        var post = ({
            id_PorodaZver: req.body.id_PorodaZver,
            PhotoZver: req.body.PhotoZver,
            NameZver: req.body.NameZver,
            DateBirthday: req.body.DateBirthday,
            SexZver: req.body.SexZver,
            ColorZver: req.body.ColorZver,
            VesZver: req.body.VesZver,
            EffectiveProcentZver: req.body.EffectiveProcentZver,
            CommentZver: req.body.CommentZver,
            CenaZver: req.body.CenaZver
        });

        //Вставка поста
        connection.query('INSERT INTO zver SET ?', post, function (err, result) {
            //Открываем главную страницу после добавления
            res.redirect('/zverspisok/');
        });
    });


    /////////////////////////
    ////////Ресурсы//////////
    /////////////////////////

    //Вывод списка всех ресурсов
    app.get('/resursspisok/', function (req, res) {
        connection.query('SELECT * FROM resurs', function (err, resurs) {

            if (err) throw err
            connection.query('SELECT * FROM prihodresurs', function (err, prihodresurs) {

                if (err) throw err
                connection.query('SELECT * FROM rashodresurs', function (err, rashodresurs) {

                    if (err) throw err
                    res.render('resursspisok.twig', {
                        // устанавливаем в представлении необходимые переменные
                        resurs: resurs,
                        prihodresurs: prihodresurs,
                        rashodresurs: rashodresurs
                    });
                })
            })
        })
    });

    //Вывод списка конкретного ресурса
    app.get('/resursspisok/:id_Resurs', function (req, res) {
        connection.query('SELECT * FROM resurs where id_Resurs = ?', [req.params.id_Resurs], function (err, resurs) {

            if (err) throw err
            connection.query('SELECT * FROM prihodresurs', function (err, prihodresurs) {

                if (err) throw err
                connection.query('SELECT * FROM rashodresurs', function (err, rashodresurs) {

                    if (err) throw err
                    connection.query('SELECT * FROM porodazver', function (err, porodazver) {

                        if (err) throw err
                        connection.query('SELECT * FROM sortrastenie', function (err, sortrastenie) {

                            if (err) throw err
                            res.render('resurs.twig', {
                                // устанавливаем в представлении необходимые переменные
                                resurs: resurs[0],
                                prihodresurs: prihodresurs,
                                rashodresurs: rashodresurs,
                                porodazver: porodazver,
                                sortrastenie: sortrastenie
                            });
                        })
                    })
                })
            })
        })
    });

    //Удаление конкретного ресурса (расход)
    app.post('/resursspisok/:id_RashodResurs', function (req, res) {
        connection.query('DELETE FROM rashodresurs WHERE id_RashodResurs = ?', req.params.id_RashodResurs, function (err, result) {

            //Открываем главную страницу после удаления
            res.redirect('back');
        });
    });

    //Удаление конкретного ресурса (приход)
    app.post('/resursspisokk/:id_PrihodResurs', function (req, res) {
        connection.query('DELETE FROM prihodresurs WHERE id_PrihodResurs = ?', req.params.id_PrihodResurs, function (err, result) {

            //Открываем главную страницу после удаления
            res.redirect('back');
        });
    });

    //Добавление нового ресурса (расход)
    app.post('/resursspisok/', function (req, res) {
        //Cчитали значения, записали в пост
        var post = ({
            id_RashodResurs: req.body.id_RashodResurs,
            id_Resurs: req.body.id_Resurs,
            KolvoResurs: req.body.KolvoResurs,
            DateIzyatResurs: req.body.DateIzyatResurs
        });

        //Вставка поста
        connection.query('INSERT INTO rashodresurs SET ?', post, function (err, result) {
            //Открываем главную страницу после добавления
            res.redirect('back');
        });
    });

    //Добавление нового ресурса (приход)
    app.post('/resursspisokk/', function (req, res) {
        //Cчитали значения, записали в пост

        var post = ({
            id_PrihodResurs: req.body.id_PrihodResurs,
            id_Resurs: req.body.id_Resurs,
            CenaResurs: req.body.CenaResurs,
            KolvoResurs: req.body.KolvoResurs,
            DatePopolnResurs: req.body.DatePopolnResurs
        });

        //Вставка поста
        connection.query('INSERT INTO prihodresurs SET ?', post, function (err, result) {
            //Открываем главную страницу после добавления
            res.redirect('back');
        });
    });

    //Страница редактирования конкретного ресурса (расход) (передача данных для редактирования)
    app.get('/resursspisok/:id_RashodResurs/edit', function (req, res) {
        if (err) throw err
        connection.query('SELECT * FROM rashodresurs WHERE id_RashodResurs = ?', [req.params.id_RashodResurs], function (err, rashodresurs) {

            if (err) throw err
            connection.query('SELECT * FROM resurs', function (err, resurs) {

                res.render('edit_rashod.twig', {
                    // устанавливаем в представлении необходимые переменные
                    rashodresurs: rashodresurs[0],
                    resurs: resurs
                });
            })
        })
    });

    //Редактирование ресурса (расход)
    app.post('/resursspisook/:id_RashodResurs', function (req, res) {
        //Cчитали значения, записали в пост

        var post = ({
            id_Resurs: req.body.id_Resurs,
            KolvoResurs: req.body.KolvoResurs,
            DateIzyatResurs: req.body.DateIzyatResurs
        });

        //Вставка поста
        connection.query('UPDATE rashodresurs SET ? WHERE id_RashodResurs = ?', [post, req.params.id_RashodResurs], function (err, result) {
            //Открываем главную страницу после добавления
            res.redirect('/resursspisok/');
        });
    });

    //Страница редактирования конкретного ресурса (приход) (передача данных для редактирования)
    app.get('/resursspisokk/:id_PrihodResurs/edit', function (req, res) {
        if (err) throw err
        connection.query('SELECT * FROM prihodresurs WHERE id_PrihodResurs = ?', [req.params.id_PrihodResurs], function (err, prihodresurs) {

            if (err) throw err
            connection.query('SELECT * FROM resurs', function (err, resurs) {

                res.render('edit_prihod.twig', {
                    // устанавливаем в представлении необходимые переменные
                    prihodresurs: prihodresurs[0],
                    resurs: resurs
                });
            })

        })
    });

    //Редактирование ресурса (приход)
    app.post('/resursspisookk/:id_PrihodResurs', function (req, res) {
        //Cчитали значения, записали в пост

        var post = ({
            id_Resurs: req.body.id_Resurs,
            CenaResurs: req.body.CenaResurs,
            KolvoResurs: req.body.KolvoResurs,
            DatePopolnResurs: req.body.DatePopolnResurs
        });

        //Вставка поста
        connection.query('UPDATE prihodresurs SET ? WHERE id_PrihodResurs = ?', [post, req.params.id_PrihodResurs], function (err, result) {
            //Открываем главную страницу после добавления
            res.redirect('/resursspisok/');
        });
    });


    /////////////////////////
    ////////Ресурс///////////
    /////////////////////////


    //Добавление нового ресурса - подготовка страницы добавления
    app.get('/addresurs', function (req, res) {
        connection.query('SELECT * FROM sortrastenie', function (err, sortrastenie) {

            if (err) throw err
            connection.query('SELECT * FROM porodazver', function (err, porodazver) {

                if (err) throw err
                res.render('add_resurs.twig', {
                    sortrastenie: sortrastenie,
                    porodazver: porodazver
                });
            })
        })
    });

    //Добавление нового ресурса
    app.post('/addresurs/', function (req, res) {

        if (req.body.id_PorodaZver === " ")
            id_PorodaZver: undefined;

        if (req.body.id_SortRastenie === " ")
            id_SortRastenie: undefined;

        //Cчитали значения, записали в пост
        var post = ({
            //id_PorodaZver: req.body.id_PorodaZver,
            //id_SortRastenie: req.body.id_SortRastenie,
            NameResurs: req.body.NameResurs,
            NormaResurs: req.body.NormaResurs,
            EdIzmResurs: req.body.EdIzmResurs
        });

        //Вставка поста
        connection.query('INSERT INTO resurs SET ?', post, function (err, result) {
            //Открываем главную страницу после добавления
            res.redirect('/resursspisok/');
        });
    });

    //Обновление таблицу ресурсы
    app.post('/resursspiisok/:id_Resurs', function (req, res) {
        //Cчитали значения, записали в пост

        var post;

        /*if (req.body.id_PorodaZver == " ")
         {
         post = ({
         id_PorodaZver: undefined,
         NormaResurs: req.body.NormaResurs
         });

         }
         else {
         post = ({
         id_PorodaZver: req.body.id_PorodaZver,
         NormaResurs: req.body.NormaResurs
         });
         }

         if (req.body.id_SortRastenie == " "){

         post = ({
         id_SortRastenie: undefined,
         NormaResurs1: req.body.NormaResurs1
         });
         }
         else {

         post = ({
         id_SortRastenie: req.body.id_SortRastenie,
         NormaResurs1: req.body.NormaResurs1
         });
         }*
         /*
         post = ({
         id_SortRastenie: req.body.id_SortRastenie,
         id_PorodaZver: req.body.id_PorodaZver,
         NormaResurs: req.body.NormaResurs
         });*/
        // Работа с породой
        if (req.body.id_PorodaZver === " ") {
            post = ({
                id_PorodaZver: undefined,
                id_SortRastenie: req.body.id_SortRastenie,
                NormaResurs: req.body.NormaResurs
            });

        }
        else {
            post = ({
                id_PorodaZver: req.body.id_PorodaZver,
                id_SortRastenie: req.body.id_SortRastenie,
                NormaResurs: req.body.NormaResurs
            });
        }
        // Работаем с растением
        if (req.body.id_SortRastenie === " ") {

            post = ({
                id_SortRastenie: undefined,
                id_PorodaZver: req.body.id_PorodaZver,
                NormaResurs: req.body.NormaResurs
            });
        }
        else {
            post = ({
                id_SortRastenie: req.body.id_SortRastenie,
                id_PorodaZver: req.body.id_PorodaZver,
                NormaResurs: req.body.NormaResurs
            });
        }

        /* post = ({
         id_SortRastenie: req.body.id_SortRastenie,
         id_PorodaZver: req.body.id_PorodaZver,
         NormaResurs: req.body.NormaResurs
         });
         */
        //Вставка поста
        connection.query('UPDATE resurs SET ? WHERE id_Resurs = ?', [post, req.params.id_Resurs], function (err, result) {
            //Открываем главную страницу после добавления
            res.redirect('back');
        });
    });


    //Ветеринарное обслуживание
    //Удаление конкретного ветеринарного обслуживания
    app.post('/zververt/:id_VetObsluj', function (req, res) {
        connection.query('DELETE FROM vetobsluj WHERE id_VetObsluj = ?', req.params.id_VetObsluj, function (err, result) {

            //Открываем главную страницу после удаления
            res.redirect('back');
        });
    });

    //Редактиррование записи о ветеринарном обслуживание
    app.get('/zververt/:id_VetObsluj/edit', function (req, res) {
        connection.query('SELECT * FROM vetobsluj WHERE id_VetObsluj = ?', [req.params.id_VetObsluj], function (err, vetobsluj) {

            if (err) throw err
            connection.query('SELECT * FROM zver', function (err, zver) {

                if (err) throw err
                res.render('edit_vetob.twig', {
                    // устанавливаем в представлении необходимые переменные
                    vetobsluj: vetobsluj[0],
                    zver: zver
                });
            })
        })
    });

    //Собственно редактирование конкретного ветеринарного обслуживания
    app.post('/zververtt/:id_VetObsluj', function (req, res) {
        var zver_par = req.body.id_Zver;
        var post = ({
            id_Zver: req.body.id_Zver,
            UslugaVet: req.body.UslugaVet,
            DateStartVet: req.body.DateStartVet,
            DateEndVet: req.body.DateEndVet,
            CenaVet: req.body.CenaVet
        });

        //Обновили значения
        connection.query('UPDATE vetobsluj SET ? WHERE id_VetObsluj = ?', [post, req.params.id_VetObsluj], function (err, result) {

            //Открываем страницу после добавления
            res.redirect('/zverspisok/' + zver_par);
        });
    });

    //Добавление новой ветеринарной услуги
    app.post('/zzverspisok/', function (req, res) {
        //Cчитали значения, записали в пост

        var post = ({
            id_VetObsluj: req.body.id_VetObsluj,
            id_Zver: req.body.id_Zver,
            UslugaVet: req.body.UslugaVet,
            DateStartVet: req.body.DateStartVet,
            DateEndVet: req.body.DateEndVet,
            CenaVet: req.body.CenaVet
        });

        //Вставка поста
        connection.query('INSERT INTO vetobsluj SET ?', post, function (err, result) {
            //Открываем главную страницу после добавления
            res.redirect('back');
        });
    });


    //Дезинфекция
    //Удаление конкретного дезинфекция
    app.post('/rasteniedez/:id_DezObsluzh', function (req, res) {
        connection.query('DELETE FROM dezobsluzh WHERE id_DezObsluzh = ?', req.params.id_DezObsluzh, function (err, result) {

            //Открываем главную страницу после удаления
            res.redirect('back');
        });
    });
    //Редактиррование записи о дезинфекции
    app.get('/rasteniedez/:id_DezObsluzh/edit', function (req, res) {
        connection.query('SELECT * FROM dezobsluzh WHERE id_DezObsluzh = ?', [req.params.id_DezObsluzh], function (err, dezobsluzh) {

            if (err) throw err
            connection.query('SELECT * FROM rastenie', function (err, rastenie) {
                if (err) throw err

                res.render('edit_dez.twig', {
                    // устанавливаем в представлении необходимые переменные
                    dezobsluzh: dezobsluzh[0],
                    rastenie: rastenie
                });
            })
        })
    });

    //Собственно редактирование конкретного дезинфекции
    app.post('/rasteniedezz/:id_DezObsluzh', function (req, res) {
        var rast_par = req.body.id_Rastenie;
        var post = ({
            id_Rastenie: req.body.id_Rastenie,
            Dezinfekcia: req.body.Dezinfekcia,
            DateStartDez: req.body.DateStartDez,
            DateEndDez: req.body.DateEndDez,
            CenaDez: req.body.CenaDez
        });

        //Обновили значения
        connection.query('UPDATE dezobsluzh SET ? WHERE id_DezObsluzh = ?', [post, req.params.id_DezObsluzh], function (err, result) {

            //Открываем страницу после добавления
            res.redirect('/rasteniespisok/' + rast_par);
        });
    });

    //Добавление новой дезинфекции
    app.post('/rrasteniedez/', function (req, res) {
        //Cчитали значения, записали в пост

        var post = ({
            id_DezObsluzh: req.body.id_DezObsluzh,
            id_Rastenie: req.body.id_Rastenie,
            Dezinfekcia: req.body.Dezinfekcia,
            DateStartDez: req.body.DateStartDez,
            DateEndDez: req.body.DateEndDez,
            CenaDez: req.body.CenaDez
        });

        //Вставка поста
        connection.query('INSERT INTO dezobsluzh SET ?', post, function (err, result) {
            //Открываем главную страницу после добавления
            res.redirect('back');
        });
    });


    //Отчет
    //Вывод списка необходимой продукции для отчета
    app.get('/otchet/', function (req, res) {
        connection.query('SELECT * FROM zver', function (err, zver) {

            if (err) throw err
            connection.query('SELECT * FROM rastenie', function (err, rastenie) {

                if (err) throw err
                connection.query('SELECT * FROM prihodresurs', function (err, prihodresurs) {

                    if (err) throw err
                    connection.query('SELECT * FROM resurs', function (err, resurs) {

                        if (err) throw err
                        res.render('otchet.twig', {
                            // устанавливаем в представлении необходимые переменные
                            zver: zver,
                            rastenie: rastenie,
                            prihodresurs: prihodresurs,
                            resurs: resurs
                        });
                    })
                })
            })
        })
    });


    //Реализация
    //Вывод списка всех реализованных продуктов
    app.get('/realization/', function (req, res) {
        connection.query('SELECT * FROM realization', function (err, realization) {

            if (err) throw err
            connection.query('SELECT * FROM zver', function (err, zver) {

                if (err) throw err
                connection.query('SELECT * FROM rastenie', function (err, rastenie) {

                    if (err) throw err
                    connection.query('SELECT * FROM sortrastenie', function (err, sortrastenie) {

                        if (err) throw err
                        connection.query('SELECT * FROM product', function (err, product) {

                            if (err) throw err
                            connection.query('SELECT * FROM productname', function (err, productname) {

                                if (err) throw err
                                res.render('realization.twig', {
                                    // устанавливаем в представлении необходимые переменные
                                    realization: realization,
                                    zver: zver,
                                    rastenie: rastenie,
                                    sortrastenie: sortrastenie,
                                    product: product,
                                    productname: productname
                                });
                            })
                        })
                    })
                })
            })
        })
    });

    //Удаление конкретного реализованного товара
    app.post('/realization/:id_Realization', function (req, res) {
        connection.query('DELETE FROM realization WHERE id_Realization = ?', req.params.id_Realization, function (err, result) {

            //Открываем главную страницу после удаления
            res.redirect('back');
        });
    });

    //Редактиррование записи о реализованном товаре
    app.get('/realization/:id_Realization/edit', function (req, res) {
        connection.query('SELECT * FROM realization WHERE id_Realization = ?', [req.params.id_Realization], function (err, realization) {

            if (err) throw err
            connection.query('SELECT * FROM zver', function (err, zver) {

                if (err) throw err
                connection.query('SELECT * FROM rastenie', function (err, rastenie) {

                    if (err) throw err
                    connection.query('SELECT * FROM sortrastenie', function (err, sortrastenie) {

                        if (err) throw err
                        connection.query('SELECT * FROM product', function (err, product) {

                            if (err) throw err
                            connection.query('SELECT * FROM productname', function (err, productname) {


                                if (err) throw err
                                res.render('edit_realiz.twig', {
                                    // устанавливаем в представлении необходимые переменные
                                    realization: realization[0],
                                    zver: zver,
                                    rastenie: rastenie,
                                    sortrastenie: sortrastenie,
                                    product: product,
                                    productname: productname
                                });
                            })
                        })
                    })
                })
            })
        })
    });

    //Собственно редактирование конкретного реализованного товара
    app.post('/realizationn/:id_Realization', function (req, res) {
        //Работаем с животным
        if (!req.body.id_Zver) {
            //Работаем с растением
            if (!req.body.id_Rastenie) {
                post = ({
                    id_Zver: undefined,
                    id_Rastenie: undefined,
                    id_Product: req.body.id_Product,
                    KolvoRealization: req.body.KolvoRealization,
                    DateRealization: req.body.DateRealization,
                    CenaRealization: req.body.CenaRealization,
                    EdIzmRealization: req.body.EdIzmRealization
                });
            }
            else {
                post = ({
                    id_Zver: undefined,
                    id_Rastenie: req.body.id_Rastenie,
                    id_Product: undefined,
                    KolvoRealization: req.body.KolvoRealization,
                    DateRealization: req.body.DateRealization,
                    CenaRealization: req.body.CenaRealization,
                    EdIzmRealization: req.body.EdIzmRealization
                });
            }
        }
        else {
            post = ({
                id_Zver: req.body.id_Zver,
                id_Rastenie: undefined,
                id_Product: undefined,
                KolvoRealization: req.body.KolvoRealization,
                DateRealization: req.body.DateRealization,
                CenaRealization: req.body.CenaRealization,
                EdIzmRealization: req.body.EdIzmRealization
            });
        }

        /*var post = ({
         id_Zver: undefined,
         id_Rastenie: req.body.id_Rastenie,
         id_Product: undefined,
         //id_Zver: req.body.id_Zver,
         //id_Rastenie: req.body.id_Rastenie,
         //id_Product: req.body.id_Product,
         KolvoRealization: req.body.KolvoRealization,
         DateRealization: req.body.DateRealization,
         CenaRealization: req.body.CenaRealization,
         EdIzmRealization: req.body.EdIzmRealization
         });*/

        //Обновили значения
        connection.query('UPDATE realization SET ? WHERE id_Realization = ?', [post, req.params.id_Realization], function (err, result) {

            //Открываем страницу после добавления
            res.redirect('/realization/');
        });
    });

    //Добавление новой реализованного продукта
    app.post('/rrealization/', function (req, res) {
        //Cчитали значения, записали в пост

        var post;
        //Работаем с животным
        if (req.body.id_Zver === " ") {
            //Работаем с растением
            if (req.body.id_Rastenie === " ") {
                post = ({
                    id_Realization: req.body.id_Realization,
                    id_Zver: undefined,
                    id_Rastenie: undefined,
                    id_Product: req.body.id_Product,
                    KolvoRealization: req.body.KolvoRealization,
                    DateRealization: req.body.DateRealization,
                    CenaRealization: req.body.CenaRealization,
                    EdIzmRealization: req.body.EdIzmRealization
                });
            }
            else {
                post = ({
                    id_Realization: req.body.id_Realization,
                    id_Zver: undefined,
                    id_Rastenie: req.body.id_Rastenie,
                    id_Product: undefined,
                    KolvoRealization: req.body.KolvoRealization,
                    DateRealization: req.body.DateRealization,
                    CenaRealization: req.body.CenaRealization,
                    EdIzmRealization: req.body.EdIzmRealization
                });
            }
        }
        else {
            post = ({
                id_Realization: req.body.id_Realization,
                id_Zver: req.body.id_Zver,
                id_Rastenie: undefined,
                id_Product: undefined,
                KolvoRealization: req.body.KolvoRealization,
                DateRealization: req.body.DateRealization,
                CenaRealization: req.body.CenaRealization,
                EdIzmRealization: req.body.EdIzmRealization
            });
        }

        //Вставка поста
        connection.query('INSERT INTO realization SET ?', post, function (err, result) {
            //Открываем главную страницу после добавления
            res.redirect('/realization/');
        });
    });

    //Продукт
    //Добавление нового ресурса - подготовка страницы добавления
    app.get('/addproductt/', function (req, res) {
        connection.query('SELECT * FROM product', function (err, product) {

            if (err) throw err
            connection.query('SELECT * FROM productname', function (err, productname) {

                if (err) throw err
                connection.query('SELECT * FROM zver', function (err, zver) {

                    if (err) throw err
                    connection.query('SELECT * FROM porodazver', function (err, porodazver) {

                        if (err) throw err
                        res.render('add_product.twig', {
                            product: product,
                            productname: productname,
                            zver: zver,
                            porodazver: porodazver
                        });
                    })
                })
            })
        })
    });

    //Добавление нового ресурса
    app.post('/addproduct/', function (req, res) {

        var post;
        //Работаем с животным
        if (req.body.id_Zver === " ") {
            post = ({
                id_Product: req.body.id_Product,
                id_Zver: undefined,
                id_ProductName: req.body.id_ProductName,
                KolvoProduct: req.body.KolvoProduct,
                DateProduct: req.body.DateProduct,
                EdIzmProduct: req.body.EdIzmProduct
            });
        }
        else {
            post = ({
                id_Product: req.body.id_Product,
                id_Zver: req.body.id_Zver,
                id_ProductName: undefined,
                KolvoProduct: req.body.KolvoProduct,
                DateProduct: req.body.DateProduct,
                EdIzmProduct: req.body.EdIzmProduct
            });
        }


        //Вставка поста
        connection.query('INSERT INTO product SET ?', post, function (err, result) {
            //Открываем главную страницу после добавления
            res.redirect('/realization/');
        });
    });

    //Получить страницу по отчеты на оборот животных
    app.get('/graphZver/', function (req, res) {

        //Возвращает твиг главной страницы
        res.render('graphzver.twig', {});
    });

    //Получить страницу по отчеты на растения
    app.get('/graphRastenie/', function (req, res) {
        //Возвращает твиг главной страницы
        res.render('graphrast.twig', {});
    });

    //Продукты
    //Вывод списка всех продуктов
    app.get('/allproduct/', function (req, res) {
        connection.query('SELECT * FROM product', function (err, product) {

            if (err) throw err
            connection.query('SELECT * FROM zver', function (err, zver) {

                if (err) throw err
                connection.query('SELECT * FROM productname', function (err, productname) {

                    if (err) throw err
                    res.render('all_product.twig', {
                        // устанавливаем в представлении необходимые переменные
                        product: product,
                        zver: zver,
                        productname: productname
                    });
                })
            })
        })
    });

    //Удаление конкретного продукта
    app.post('/allproduct/:id_Product', function (req, res) {
        connection.query('DELETE FROM product WHERE id_Product = ?', req.params.id_Product, function (err, result) {

            //Открываем главную страницу после удаления
            res.redirect('back');
        });
    });

    //Редактиррование записи о реализованном товаре
    app.get('/allproduct/:id_Product/edit', function (req, res) {
        connection.query('SELECT * FROM product WHERE id_Product = ?', [req.params.id_Product], function (err, product) {

            if (err) throw err
            connection.query('SELECT * FROM zver', function (err, zver) {

                if (err) throw err
                connection.query('SELECT * FROM productname', function (err, productname) {


                    if (err) throw err
                    res.render('edit_product.twig', {
                        // устанавливаем в представлении необходимые переменные
                        product: product[0],
                        zver: zver,
                        productname: productname
                    });
                })

            })
        })
    });

    //Собственно редактирование конкретного реализованного товара
    app.post('/allproductt/:id_Product', function (req, res) {
        //Работаем с животным
        if (!req.body.id_Zver) {

            post = ({
                id_Zver: undefined,
                id_ProductName: req.body.id_ProductName,
                KolvoProduct: req.body.KolvoProduct,
                DateProduct: req.body.DateProduct,
                EdIzmProduct: req.body.EdIzmProduct
            });
        }
        else {
            post = ({
                id_Zver: req.body.id_Zver,
                id_ProductName: undefined,
                KolvoProduct: req.body.KolvoProduct,
                DateProduct: req.body.DateProduct,
                EdIzmProduct: req.body.EdIzmProduct
            });
        }

        /*var post = ({
         id_Zver: undefined,
         id_Rastenie: req.body.id_Rastenie,
         id_Product: undefined,
         //id_Zver: req.body.id_Zver,
         //id_Rastenie: req.body.id_Rastenie,
         //id_Product: req.body.id_Product,
         KolvoRealization: req.body.KolvoRealization,
         DateRealization: req.body.DateRealization,
         CenaRealization: req.body.CenaRealization,
         EdIzmRealization: req.body.EdIzmRealization
         });*/

        //Обновили значения
        connection.query('UPDATE product SET ? WHERE id_Product = ?', [post, req.params.id_Product], function (err, result) {

            //Открываем страницу после добавления
            res.redirect('/allproduct/');
        });
    });


    //Обработка данных из базы для отчетов
    //Годовая продуктивность стада
    app.get('/otchetStado/', function (req, res) {
        connection.query('SELECT * FROM product ORDER BY DateProduct', function (err, product) {

            if (err) throw err
            connection.query('SELECT * FROM zver', function (err, zver) {

                if (err) throw err
                connection.query('SELECT * FROM productname', function (err, productname) {

                    if (err) throw err
                    res.render('otchetStado.twig', {
                        // устанавливаем в представлении необходимые переменные
                        product: product,
                        zver: zver,
                        productname: productname
                    });
                })
            })
        })
    });


    //Оборот поголовья
    app.get('/otchetPogol/', function (req, res) {
        connection.query('SELECT * FROM zver ORDER BY EffectiveProcentZver', function (err, zver) {

            if (err) throw err
            connection.query('SELECT * FROM porodazver', function (err, porodazver) {

                if (err) throw err
                res.render('otchetPogol.twig', {
                    // устанавливаем в представлении необходимые переменные
                    zver: zver,
                    porodazver: porodazver
                });
            })
        })
    });

    //Оборот растений
    app.get('/otchetGreen/', function (req, res) {
        connection.query('SELECT * FROM rastenie ORDER BY EffectiveProcentRastenie', function (err, rastenie) {

            if (err) throw err
            connection.query('SELECT * FROM sortrastenie', function (err, sortrastenie) {

                if (err) throw err
                res.render('otchetGreen.twig', {
                    // устанавливаем в представлении необходимые переменные
                    rastenie: rastenie,
                    sortrastenie: sortrastenie
                });
            })
        })
    });

    //Оборот ресурсов
    app.get('/otchetResurs/', function (req, res) {
        connection.query('SELECT * FROM realization ORDER BY DateRealization', function (err, realization) {

            if (err) throw err
            connection.query('SELECT * FROM zver', function (err, zver) {

                if (err) throw err
                connection.query('SELECT * FROM rastenie', function (err, rastenie) {

                    if (err) throw err
                    connection.query('SELECT * FROM sortrastenie', function (err, sortrastenie) {

                        if (err) throw err
                        connection.query('SELECT * FROM product', function (err, product) {

                            if (err) throw err
                            connection.query('SELECT * FROM productname', function (err, productname) {

                                if (err) throw err
                                connection.query('SELECT * FROM prihodresurs', function (err, prihodresurs) {

                                    if (err) throw err
                                    connection.query('SELECT * FROM resurs', function (err, resurs) {

                                    if (err) throw err
                                res.render('otchetResurs.twig', {
                                    // устанавливаем в представлении необходимые переменные
                                    realization: realization,
                                    zver: zver,
                                    rastenie: rastenie,
                                    sortrastenie: sortrastenie,
                                    product: product,
                                    productname: productname,
                                    prihodresurs: prihodresurs,
                                    resurs: resurs
                                });
                            })
                        })
                        })
                        })
                    })
                })
            })
        })
    });

    //Вешаем сервер на порт
    app.listen(8075);
    console.log('Express server listening on port 8075');
})