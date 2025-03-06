import { useQuery } from "@tanstack/react-query"
import { getAllMessages } from "../lib/api";

export const MESSAGES = 'MESSAGES'; 

const useAllMessages = (reciepient, opts={}) => {
    const {data: messages = [], ...rest } = useQuery({
        queryKey: [MESSAGES],
        queryFn: getAllMessages(reciepient),
        ...opts
    })

    return {messages, ...rest}
}

export default useAllMessages;