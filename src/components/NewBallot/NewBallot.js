import { Box, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";

const NewBallot = (props) => {

    const form = useForm({
        initialValues: {
            ballotName: '',
            candidate1: '',
            candidate2: ''
        }
    })

    const createBallot = async (values) => {
        console.log(values.candidate1)
        await window.contract.addCandidatePair({
            prompt: values.ballotName,
            name1: values.candidate1,
            name2: values.candidate2
        })

        await window.contract.addToPromptArray({
            prompt: values.ballotName
        })

        await window.contract.addVote({
            prompt: values.ballotName,
            index: 0
        })

        alert("Votación registrada con éxito")
    }

    return (
        <Box>
            <form onSubmit={form.onSubmit((values) => createBallot(values))}>
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
    )
}

export default NewBallot;