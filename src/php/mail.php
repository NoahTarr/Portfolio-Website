<?php
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
$subject = $_POST['subject'];

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


$to = "contact@noahtarr.com";

$headers = "From: " . $email . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

$content = "From: $name <br/>Message: $message";

mail($to, $subject, $content, $headers) or die("Error!");

print json_encode(array('message' => 'Email successfully sent!' ,'code' => 1));
exit();