<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  require 'phpmailer/src/Exception.php';
  require 'phpmailer/src/PHPMailer.php';

  $mail = new PHPMailer(true);
  $mail->CharSet = 'UTF-8';
  $mail->setLanguage('ru', 'phpmailer/language');
  $mail->IsHTML(true);

  $name = $_POST['name'];
  $surname = $_POST['surname'];
  $phone = $_POST['phone'];
  $email = $_POST['email'];
  $comment = $_POST['quest'];
  $catalog = $_POST['catalog'];

  $body = '';
  if(isset($name)) {
    $body.= '<p><strong>Имя:</strong> '.$name.'</p>';
  }
  if(isset($surname)) {
    $body.= '<p><strong>Фамилия:</strong> '.$surname.'</p>';
  }
  if(isset($phone)) {
    $body.= '<p><strong>Телефон:</strong> '.$phone.'</p>';
  }
  if(isset($email)) {
    $body.= '<p><strong>E-mail:</strong> '.$email.'</p>';
  }
  if(isset($catalog)) {
    $body.= '<p><strong>'.$catalog.'</strong></p>';
  }
  if(isset($comment)) {
    $body.= '<p><strong>Сообщение:</strong> '.$comment.'</p>';
  }

  $mail->setFrom('evgeny.gurtovoy@andlimer.ru', 'Счастливый малыш');
  $mail->addAddress('andlimer@gmail.com');
  
  $mail->Subject = 'Заявка с сайта';
  $mail->Body = $body;

  if (!$mail->send()) {
    $message = 'Ошибка';
  } else {
    $message = 'Данные отправлены!';
  }

  $response = ['message' => $message];
  header('Content-type: application/json');
  echo json_encode($response);
?>