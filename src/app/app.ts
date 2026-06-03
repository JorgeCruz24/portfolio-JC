import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from './components/navbar/navbar';
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { Skills } from './components/skills/skills';
import { Projects } from './components/projects/projects';
import { Contact } from './components/contact/contact';

@Component({
  selector: 'app-root',
  imports: [CommonModule, Navbar, Home, About, Skills, Projects, Contact],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'portafolio-front';
}
