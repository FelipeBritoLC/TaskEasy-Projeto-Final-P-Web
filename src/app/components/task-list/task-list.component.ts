import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  selectedTask: Task | null = null;

  constructor(private taskService: TaskService, private snackbar: SnackbarService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  onSave(task: Task) {
    if (task.id) {
      this.taskService.updateTask(task).subscribe(() => {
        this.snackbar.show('Tarefa atualizada');
        this.loadTasks();
      });
    } else {
      this.taskService.addTask(task).subscribe(() => {
        this.snackbar.show('Tarefa adicionada');
        this.loadTasks();
      });
    }
    this.selectedTask = null;
  }

  editTask(task: Task) {
    this.selectedTask = { ...task };
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.snackbar.show('Tarefa removida');
      this.loadTasks();
    });
  }

  toggleComplete(task: Task) {
    task.completed = !task.completed;
    this.onSave(task);
  }
}
