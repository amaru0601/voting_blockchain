import { Box, Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, {useEffect, useState} from 'react';

import { Link } from 'react-router-dom';

import '../../stylesheets/BallotForm.css';
import Swal from 'sweetalert2';

const NewBallot = (props) => {
  const form = useForm({
    initialValues: {
      ballotName: '',
      candidate1: '',
      candidate2: '',
    },
    /* validate: (values) => ({
      ballotName:
        values.ballotName === undefined ? 'Ballot Name is required' : null,
    }), */
  });

  const [created, setCreated] = useState(false)

  useEffect(() => {

    if (created) {
      setCreated(false)
      // cerrar el alert y abrir nuevo alert
      Swal.close()
      Swal.fire({
        position: 'center',
        icon: 'success',
        text: 'The ballot has been created',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }, [created])

  const createBallot = async (values) => {
    console.log(values.candidate1);
    await window.contract.addCandidatePair({
      prompt: values.ballotName,
      name1: values.candidate1,
      name2: values.candidate2,
    });

    await window.contract.addToPromptArray({
      prompt: values.ballotName,
    });

    await window.contract.addVote({
      prompt: values.ballotName,
      index: 0,
    });

    console.log('ballot creada');
    return true;
  };

  const loading = (values) => {
    Swal.fire({
      title: 'Creating. It can take a moment.',
      didOpen: async () => {
        Swal.showLoading();
        const success = await createBallot(values);
        setCreated(success)
      },

    });
  };

  return (
    <>
      <h2>Fill the blanks with the required information</h2>
      <Box className="ballotForm">
        <form onSubmit={form.onSubmit((values) => loading(values))}>
          <TextInput
            label="Nombre de la votación"
            {...form.getInputProps('ballotName')}
          />
          <TextInput
            label="Nombre del candidato 1"
            {...form.getInputProps('candidate1')}
          />
          <TextInput
            label="Nombre del candidato 2"
            {...form.getInputProps('candidate2')}
          />
          <Group position="right" mt="md">
            <Button type="submit">Crear votación</Button>
          </Group>
        </form>
      </Box>
      <Box
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
          textAlign: 'center',
          padding: '1em',
          borderRadius: theme.radius.md,
          cursor: 'pointer',
          minWidth: '10em',

          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[5]
                : theme.colors.gray[1],
          },
        })}
      >
        <Link to={'/'}>Back to Home</Link>
      </Box>
    </>
  );
};

export default NewBallot;
