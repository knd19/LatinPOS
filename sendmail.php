<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $to = "aman.technospike@gmail.com";  // <-- Replace with your Gmail
    $subject = "New Form Submission from Latin POS";

    // Collect all fields
    $company_name    = $_POST['company_name'];
    $alias           = $_POST['alias'];
    $direccion       = $_POST['direccion'];
    $zipcode         = $_POST['zipcode'];
    $telefono        = $_POST['telefono'];
    $email           = $_POST['email'];
    $contacto_nombre = $_POST['contacto_nombre'];
    $cargo           = $_POST['cargo'];
    $tipo_mercado    = $_POST['tipo_mercado'];

    // Create email body
    $message = "
    Nuevo formulario enviado:

    Nombre de la compañía: $company_name
    Alias: $alias
    Dirección: $direccion
    Zipcode: $zipcode
    Teléfonos: $telefono
    Email: $email
    Nombre del contacto: $contacto_nombre
    Cargo: $cargo
    Tipo de mercado: $tipo_mercado
    ";

    // Email headers
    $headers = "From: Latin Pos <no-reply@yourdomain.com>\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send email
    if (mail($to, $subject, $message, $headers)) {
        echo "success";
    } else {
        echo "error";
    }
}
?>
