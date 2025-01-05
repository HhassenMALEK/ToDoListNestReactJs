/**
 * @todo VOUS DEVEZ IMPLÉMENTER LES POINTS DE TERMINAISON DE SUPPRESSION ET DE SAUVEGARDE DES TÂCHES, UNE TÂCHE NE PEUT PAS ÊTRE MISE À JOUR SI LE NOM DE LA TÂCHE N'A PAS CHANGÉ, VOUS DEVEZ CONTRÔLER L'ÉTAT DU BOUTON EN CONSÉQUENCE
 */
import { Check, Delete } from '@mui/icons-material';
import { Box, Button, Container, IconButton, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch.ts';
import { Task } from '../index';

const TodoPage = () => {
  const api = useFetch();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskEdits, setTaskEdits] = useState<{ [id: number]: string }>({}); // Suivre les noms de tâches modifiés
  const [newTaskName, setNewTaskName] = useState<string>(''); // Suivre le nom de la nouvelle tâche
  const [error, setError] = useState<string | null>(null); // Suivre les messages d'erreur

  const handleFetchTasks = async () => {
    try {
      const tasks = await api.get('/tasks'); // Récupère la liste des tâches depuis l'API
      setTasks(tasks);
    } catch (error) {
      setError('Erreur lors du chargement des tâches');
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`); 
      handleFetchTasks();
    } catch (error) {
      setError('Erreur lors de la suppression de la tâche');
      console.error(error);
    }
  };

  const handleSave = async (id?: number, newName?: string) => {
    try {
      if (id !== undefined && newName !== undefined && newName !== '') {
        await api.patch(`/tasks/${id}`, { name: newName }); // Met à jour la tâche par son ID
      } else if (newTaskName !== '') {
        await api.post('/tasks', { name: newTaskName }); // Crée une nouvelle tâche
        setNewTaskName(''); // Réinitialise le champ de saisie de la nouvelle tâche
      }
      handleFetchTasks(); 
    } catch (error) {
      setError('Erreur lors de la sauvegarde de la tâche');
      console.error(error);
    }
  };

  const handleTaskChange = (id: number, newName: string) => {
    setTaskEdits((prev) => ({
      ...prev,
      [id]: newName, // Met à jour l'état local avec le nouveau nom de la tâche
    }));
  };

  useEffect(() => {
    handleFetchTasks(); 
  }, []);

  return (
    <Container>
      {error && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Typography color="error">{error}</Typography>
        </Box>
      )}
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2">HDM Todo List</Typography>
      </Box>

      <Box justifyContent="center" mt={5} flexDirection="column">
        {tasks.map((task) => (
          <Box key={task.id} display="flex" justifyContent="center" alignItems="center" mt={2} gap={1} width="100%">
            <TextField
              size="small"
              value={taskEdits[task.id] !== undefined ? taskEdits[task.id] : task.name}
              onChange={(e) => handleTaskChange(task.id, e.target.value)}
              fullWidth
              sx={{ maxWidth: 350 }}
            />
            <Box>
              <IconButton
                color="success"
                onClick={() => handleSave(task.id, taskEdits[task.id])}
                disabled={taskEdits[task.id] === undefined || taskEdits[task.id] === task.name}
              >
                <Check />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => handleDelete(task.id)}
              >
                <Delete />
              </IconButton>
            </Box>
          </Box>
        ))}

        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <TextField
            size="small"
            placeholder="Nom de la nouvelle tâche"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            fullWidth
            sx={{ maxWidth: 350 }}
          />
          <Button
            variant="outlined"
            onClick={() => handleSave()}
            disabled={newTaskName === ''}
            sx={{ ml: 2 }}
          >
            Ajouter une tâche
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default TodoPage;