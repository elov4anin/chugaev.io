<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 9/4/17
 * Time: 11:19 AM
 */

// CRM server conection data
define('CRM_HOST', 'crm.bisys.ru'); // your CRM domain name
define('CRM_PORT', '443'); // CRM server port
define('CRM_PATH', '/crm/configs/import/lead.php'); // CRM server REST service path

// CRM server authorization data
define('CRM_LOGIN', 'ckassa'); // login of a CRM user able to manage leads
define('CRM_PASSWORD', 'SXCQDN'); // password of a CRM user

if ($_POST) {
  define('LK_HOST', 'https://crmdev.bisys.ru/api.php?'); // your LK domain name

  foreach($_POST as $k=>$v){
    if(ini_get('magic_quotes_gpc'))
      $_POST[$k]=stripslashes($_POST[$k]);

    $_POST[$k]=htmlspecialchars(strip_tags($_POST[$k]));
  }

  $name = $_POST['name'];
  $phone = $_POST['tel'];
  $comment = $_POST['text'];


  if(empty($name)) {$name="Не указано";}
  if(empty($phone)) {
    $output['error'] = "Введите телефон";
    echo json_encode($output);
    exit();
  } else if (!preg_match("/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/", $phone)) {
    $output['error'] = "Некорректный номер телефона";
    echo json_encode($output);
    exit();
  }

  $output['error'] = "0";


  $sign = "f7f16972df958b61e78cab0b360fc1f0";
  $action ="backcall";
  $assigned_id= 77;
  $source = "Taxi";


  // get lead data from the form
  $postData = array(
      'TITLE' => "Обратный звонок_Такси",
      'NAME' => $name,
      'PHONE_WORK' => $phone,
      'SOURCE_ID' => 26,
      'ASSIGNED_BY_ID' => 77,
      'STATUS_ID' => 16,
      'COMMENTS' => $comment
  );

  // append authorization data
  if (defined('CRM_AUTH')) {
    $postData['AUTH'] = CRM_AUTH;
  } else {
    $postData['LOGIN'] = CRM_LOGIN;
    $postData['PASSWORD'] = CRM_PASSWORD;
  }

  // open socket to CRM
  $fp = fsockopen("ssl://" . CRM_HOST, CRM_PORT, $errno, $errstr, 30);
  if ($fp) {
    // prepare POST data
    $boundary = sha1(1);
    $crlf = "\r\n";
    $body = '';
    foreach ($postData as $key => $value) {
      $body .= '--' . $boundary . $crlf
          . 'Content-Disposition: form-data; name="' . $key . '"' . $crlf
          . 'Content-Length: ' . strlen($value) . $crlf . $crlf
          . $value . $crlf;
    }

    $write = "POST " . CRM_PATH . " HTTP/1.1\r\n"
        . "Host: " . CRM_HOST . "\r\n"
        . "Content-type: multipart/form-data; boundary=" . $boundary . "\r\n"
        . "Content-Length: " . strlen($body) . "\r\n"
        . "Connection: Close\r\n\r\n"
        . $body;

    // send POST to CRM
    fwrite($fp, $write);

    // get CRM headers
    $result = '';
    while (!feof($fp)) {
      $result .= fgets($fp, 128);
    }
    fclose($fp);
  }
  echo json_encode($output);
}