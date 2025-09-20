let tasks = [];
        let nextId = 1;

        
        document.getElementById('taskInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') addTask();
        });

        function addTask() {
            const input = document.getElementById('taskInput');
            const text = input.value.trim();
            
            if (!text) return;

            tasks.push({
                id: nextId++,
                text: text,
                completed: false
            });

            input.value = '';
            render();
        }

        function toggleTask(id) {
            const task = tasks.find(t => t.id === id);
            if (task) {
                task.completed = !task.completed;
                render();
            }
        }

        function deleteTask(id) {
            tasks = tasks.filter(t => t.id !== id);
            render();
        }

        function render() {
            const taskList = document.getElementById('taskList');
            const stats = document.getElementById('stats');

            if (tasks.length === 0) {
                taskList.innerHTML = `
                    <div class="empty">
                        <div class="empty-icon">📝</div>
                        <h3>No tasks yet</h3>
                        <p>Add a task above to get started</p>
                    </div>
                `;
                stats.style.display = 'none';
                return;
            }

            taskList.innerHTML = tasks.map(task => `
                <div class="task ${task.completed ? 'completed' : ''}" onclick="toggleTask(${task.id})">
                    <div class="checkbox"></div>
                    <div class="task-text">${task.text}</div>
                    <button class="delete-btn" onclick="event.stopPropagation(); deleteTask(${task.id})" title="Delete">×</button>
                </div>
            `).join('');

           
            const total = tasks.length;
            const completed = tasks.filter(t => t.completed).length;
            const remaining = total - completed;

            document.getElementById('totalCount').textContent = total;
            document.getElementById('completedCount').textContent = completed;
            document.getElementById('remainingCount').textContent = remaining;
            
            stats.style.display = 'flex';
        }

        
        render();