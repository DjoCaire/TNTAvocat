<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';


$nom = $_POST['nom'];
$prenom = $_POST['prenom'];
$email = $_POST['email'];
$telephone = $_POST['telephone'];
$sujet = $_POST['sujet'];
$message = $_POST['message'];


$mail = new PHPMailer(true);

try {
    
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com'; 
    $mail->SMTPAuth = true;
    $mail->Username = 'noreply.medically@gmail.com'; 
    $mail->Password = 'fjyz cznt dhsx exoe'; 
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    
    $mail->setFrom('noreply.medically@gmail.com', 'TNTAvocat');
    $mail->addAddress('matsouchet@gmail.com', 'Destinataire');
    $mail->addReplyTo($email, "$nom $prenom"); // Réponse à l'utilisateur

    
    $mail->isHTML(true);
    $mail->Subject = $sujet;
    $mail->Body = "<strong>Nom :</strong> $nom<br>
                   <strong>Prénom :</strong> $prenom<br>
                   <strong>Email :</strong> $email<br>
                   <strong>Téléphone :</strong> $telephone<br>
                   <strong>Message :</strong><br>$message";
    $mail->AltBody = "Nom : $nom\nPrénom : $prenom\nEmail : $email\nTéléphone : $telephone\nMessage :\n$message";

    
    $mail->send();

    
    header('Location: index.html');
    exit();
} catch (Exception $e) {
    echo "L'email n'a pas pu être envoyé. Erreur: {$mail->ErrorInfo}";
}
?>
