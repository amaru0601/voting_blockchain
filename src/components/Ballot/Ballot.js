import { Box } from "@mantine/core";
import React, {useEffect} from "react";
import { useParams } from "react-router-dom";

const Ballot = (props) => {

    let { ballotName } = useParams();

    useEffect(() => {
        const init = async () => {
            let voteCount = await window.contract.getVotes({
                prompt: ballotName
            })
            console.log(voteCount)
            if (voteCount[0] == -1) {
                console.log("no existe votación")
            } else {
                let pairCandidate = await window.contract.getCandidatePair({
                    prompt: ballotName
                })
                console.log(pairCandidate)
                let didParticipate = await window.contract.didParticipate({
                    prompt: ballotName,
                    user: window.accountId,
                })

                console.log(didParticipate)
            }
            
        }

        init()
    }, [])

    console.log(ballotName)
    return (
        <Box>
            BALLOT
        </Box>
    )
}

export default Ballot;