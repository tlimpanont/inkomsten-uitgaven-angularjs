<?php
try {
$db = new PDO('mysql:host=localhost;dbname=inkomsten-uitgaven-angularjs', "root", "");
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$request = $app->request();
	
	/* RESOURCE INCOMES */
	$app->get('/incomes/?', function () use ($db, $app) {
	    $q = $db->prepare("SELECT * FROM incomes");
		$q->execute();
		echo json_encode($q->fetchAll(PDO::FETCH_OBJ), JSON_NUMERIC_CHECK );
	});

	$app->post('/incomes/?', function () use ($db, $app, $request) {
		$params = array_keys($app->request()->post()); $params = json_decode($params[0]);
		$q = $db->prepare("INSERT INTO incomes  (label, amount) VALUES (:label, :amount)");
		$q->execute(array(':label'=> $params->label, ':amount' => $params->amount));

		$q = $db->prepare("SELECT * FROM incomes");
		$q->execute();

		echo json_encode($q->fetchAll(PDO::FETCH_OBJ), JSON_NUMERIC_CHECK );
	});

	$app->delete('/incomes/:id?', function ($id) use ($db, $app, $request) {
	
		$q = $db->prepare("DELETE FROM incomes WHERE id = :id ");
		$q->execute(array(':id'=> $id));

		$q = $db->prepare("SELECT * FROM incomes");
		$q->execute();

		echo json_encode($q->fetchAll(PDO::FETCH_OBJ), JSON_NUMERIC_CHECK );
	});

	/* END RESOURCE INCOMES */


	/* RESOURCE EXPENSES  */
	$app->get('/expenses/?', function () use($db, $app) {
	    $q = $db->prepare("SELECT * FROM expenses");
		$q->execute();
		echo json_encode($q->fetchAll(PDO::FETCH_OBJ), JSON_NUMERIC_CHECK );
	});

	$app->post('/expenses/?', function () use ($db, $app) {
	    $params = array_keys($app->request()->post()); $params = json_decode($params[0]);
	    $q = $db->prepare("INSERT INTO expenses  (label, amount) VALUES (:label, :amount)");
		$q->execute(array(':label'=> $params->label, ':amount' => $params->amount));
		
		$q = $db->prepare("SELECT * FROM expenses");
		$q->execute();

		echo json_encode($q->fetchAll(PDO::FETCH_OBJ), JSON_NUMERIC_CHECK );

	});

	$app->delete('/expenses/:id?', function ($id) use ($db, $app, $request) {
	
		$q = $db->prepare("DELETE FROM expenses WHERE id = :id ");
		$q->execute(array(':id'=> $id));

		$q = $db->prepare("SELECT * FROM expenses");
		$q->execute();

		echo json_encode($q->fetchAll(PDO::FETCH_OBJ), JSON_NUMERIC_CHECK );
	});


	/* END RESOURCE EXPENSES */

	$app->run();

} catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}


