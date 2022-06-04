import { Box, List, Table } from "@mantine/core";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Paperclip } from "tabler-icons-react";

const ListBallots = (props) => {
    const [ballots, setBallots] = useState([])
    
    useEffect(() => {
        const getBallots = async () => {
            setBallots(await window.contract.getAllPrompts())
            console.log(await window.contract.getAllPrompts())
        }
        getBallots()
    }, [])

    //console.log(await window.contract.getAllPrompts())
    return (    
        <Box>
            <List center icon={<Paperclip />}>
                {
                    ballots.map( (val,i) => <Link key={i} to={"/list/"+val}><List.Item key={i}>{val}</List.Item></Link>)
                }
            </List>
        </Box>
    )
}

export default ListBallots;