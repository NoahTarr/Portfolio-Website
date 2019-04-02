<?php
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
$subject = $_POST['subject'];
$captcha = $_POST['captcha'];
$captchaValue = $_POST['captchaValue'];

header('Content-Type: application/json');
if (empty($name)){
    print json_encode(array('message' => 'Name cannot be empty', 'code' => 0));
    exit();
}
if ($email === ''){
    print json_encode(array('message' => 'Email cannot be empty', 'code' => 0));
    exit();
} else {
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)){
        print json_encode(array('message' => 'Email format invalid.', 'code' => 0));
        exit();
    }
}
if ($subject === ''){
    print json_encode(array('message' => 'Subject cannot be empty', 'code' => 0));
    exit();
}
if ($message === ''){
    print json_encode(array('message' => 'Message cannot be empty', 'code' => 0));
    exit();
}
if ($captcha !== strval($captchaValue)) {
    if ($captcha === '') {
        print json_encode(array('message' => 'Please enter the captcha', 'code' => 0));
    }
    else
    {
        print json_encode(array('message' => 'The captcha is incorrect', 'code' => 0));
    }
    exit();
}
$content="From: $name \nEmail: $email \nMessage: $message";
$recipient = "noahtarr1@gmail.com";
$mailheader = "From: contact@noahtarr.com \r\n";
mail($recipient, $subject, $content, $mailheader) or die("Error!");
print json_encode(array('message' => 'Email successfully sent!' ,'code' => 1));
exit();