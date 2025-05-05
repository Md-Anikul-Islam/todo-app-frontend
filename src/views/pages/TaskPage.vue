<template>
  <div class="content-wrapper" v-if="loggedInStatus">
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Tasks</h1>
          </div>
        </div>
      </div>
    </div>

    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Task List</h3>
                <div class="card-tools">
                  <button class="btn btn-primary" @click="showAddModal = true">
                    <i class="fas fa-plus"></i> Add Task
                  </button>
                </div>
              </div>
              <div class="card-body">
                <div v-if="loading" class="text-center">
                  <i class="fas fa-spinner fa-spin"></i> Loading...
                </div>
                <div v-if="error" class="alert alert-danger">{{ error }}</div>

                <table class="table table-bordered" v-if="!loading && tasks.length > 0">
                  <thead>
                  <tr>
                    <th>Title</th>
                    <th class="text-center">Details</th>
                    <th>Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="task in tasks" :key="task.id">
                    <td style="min-width:150px;">{{ task.title }}</td>
                    <td style="max-width:450px;">{{ task.details }}</td>
                    <td style="min-width:150px;">
                      <button class="btn btn-sm btn-info mr-2" @click="editTask(task)">
                        <i class="fas fa-edit"></i>
                      </button>
                      <button class="btn btn-sm btn-danger" @click="deleteTask(task.id)">
                        <i class="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                  </tbody>
                </table>

                <div v-if="!loading && tasks.length === 0" class="alert alert-info">
                  No tasks found. Create your first task!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Task Modal -->
    <div class="modal fade" :class="{show: showAddModal}" :style="{display: showAddModal ? 'block' : 'none'}" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditing ? 'Edit Task' : 'Add Task' }}</h5>
            <button type="button" class="close" @click="closeModal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="isEditing ? updateTask() : createTask()">
              <div class="form-group">
                <label>Title</label>
                <input type="text" class="form-control" v-model="currentTask.title" required>
              </div>
              <div class="form-group">
                <label>Details</label>
                <textarea class="form-control" v-model="currentTask.details"></textarea>
              </div>

              <div class="form-group">
                <label>Marks</label>
                <input type="text" class="form-control" v-model="currentTask.marks">
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
                <button type="submit" class="btn btn-primary">
                  {{ isEditing ? 'Update' : 'Save' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade" :class="{show: showAddModal}" :style="{display: showAddModal ? 'block' : 'none'}"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'TaskPage',
  data() {
    return {
      showAddModal: false,
      isEditing: false,
      currentTask: {
        id: null,
        title: '',
        details: '',
        marks: ''
      }
    };
  },
  computed: {
    ...mapGetters({
      tasks: 'GET_TASKS',
      loading: 'GET_LOADING',
      error: 'GET_ERROR',
      loggedInStatus: 'GET_AUTH_STATUS'
    })
  },
  created() {
    this.fetchTasks();
  },
  methods: {
    ...mapActions([
      'FETCH_TASKS',
      'CREATE_TASK',
      'UPDATE_TASK',
      'DELETE_TASK'
    ]),
    fetchTasks() {
      this.FETCH_TASKS();
    },
    createTask() {
      this.CREATE_TASK(this.currentTask)
          .then(() => {
            this.closeModal();
          })
          .catch(error => {
            console.error('Error creating task:', error);
          });
    },
    editTask(task) {
      this.currentTask = { ...task };
      this.isEditing = true;
      this.showAddModal = true;
    },
    updateTask() {
      this.UPDATE_TASK({
        id: this.currentTask.id,
        taskData: this.currentTask
      }).then(() => {
        this.closeModal();
      });
    },
    deleteTask(id) {
      if (confirm('Are you sure you want to delete this task?')) {
        this.DELETE_TASK(id);
      }
    },
    closeModal() {
      this.showAddModal = false;
      this.isEditing = false;
      this.resetCurrentTask();
    },
    resetCurrentTask() {
      this.currentTask = {
        id: null,
        title: '',
        details: ''
      };
    }
  }
};
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-backdrop {
  opacity: 0.5;
}
</style>