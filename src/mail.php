<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\SMTP;
  use PHPMailer\PHPMailer\Exception;
  
  require 'vendor/autoload.php';
  
  $mail = new PHPMailer(true);
  
  try {
    $mail->isSMTP();
    $mail->Host = 'smtp.mail.ru';
    $mail->SMTPAuth = true;
    $mail->Username = 'andlimer@mail.ru';
    $mail->Password = 'Jhn13ndlmr23';
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;
  
    $mail->setFrom('andlimer@mail.ru', 'Счастливый малыш');
    $mail->addAddress('andlimer@gmail.com');

    $mail->isHTML(true);
    $mail->Subject = 'Заявка с сайта';
    $mail->Body = '';
    $mail->AltBody = '';

    $mail->send();
    echo 'Message has been sent';
  } catch (Exception $e) {
      echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
  }
?>