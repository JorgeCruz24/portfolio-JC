import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;

      // 1. Mapeamos los parámetros con los valores del formulario reactivo
      const templateParams = {
        name: this.contactForm.value.name,
        email: this.contactForm.value.email,
        message: this.contactForm.value.message
      };

      // 2. Enviamos el correo usando las credenciales de EmailJS
      emailjs
        .send(
          environment.emailjs.serviceId,
          environment.emailjs.templateId,
          templateParams,
          environment.emailjs.publicKey
        )
        .then(
          (response: EmailJSResponseStatus) => {
            // Éxito en el envío
            this.isSubmitting = false;
            this.submitSuccess = true;
            this.contactForm.reset();

            // Quitar el mensaje de éxito después de 5 segundos
            setTimeout(() => (this.submitSuccess = false), 5000);
          },
          (error) => {
            // Manejo de errores por si falla el servicio
            console.error('Error al enviar el formulario por EmailJS:', error);
            this.isSubmitting = false;
            alert('Hubo un problema al enviar el mensaje. Inténtalo de nuevo más tarde.');
          }
        );

    } else {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }
}
