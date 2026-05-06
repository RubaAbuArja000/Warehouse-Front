import { Component, OnInit, inject, signal } from '@angular/core';
import { LogsApiService } from '../../../../services/api/logs/logs-api-service';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [],
  templateUrl: './logs-page-section.html',
  styleUrl: './logs-page-section.scss',
})
export class LogsPage implements OnInit {
  private api = inject(LogsApiService);

  files        = signal<string[]>([]);
  selectedFile = signal<string | null>(null);
  content      = signal('');
  loadingFiles = signal(true);
  loadingContent = signal(false);

  ngOnInit(): void {
    this.api.getFiles().subscribe({
      next:  (files) => { this.files.set(files); this.loadingFiles.set(false); },
      error: ()      => this.loadingFiles.set(false),
    });
  }

  selectFile(fileName: string): void {
    if (this.selectedFile() === fileName) return;
    this.selectedFile.set(fileName);
    this.content.set('');
    this.loadingContent.set(true);
    this.api.getContent(fileName).subscribe({
      next:  (text) => { this.content.set(text); this.loadingContent.set(false); },
      error: ()     => { this.content.set('Failed to load log content.'); this.loadingContent.set(false); },
    });
  }
}
