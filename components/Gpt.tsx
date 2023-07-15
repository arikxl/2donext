import fetchSuggestion from '@/lib/fetchSuggestion';
import { useBoardStore } from '@/store/BoardStore'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react';

const Gpt = () => {

    const [board] = useBoardStore((state) => [
        state.board,
    ]);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [suggestion, setSuggestion] = useState<string>("");


    useEffect(() => {
        if (board.columns.size === 0) return;
        setIsLoading(true);

        const fetchSuggestionFunc = async () => {
            const suggestion = await fetchSuggestion(board);
            setSuggestion(suggestion);
            setIsLoading(false);
        }

        fetchSuggestionFunc();
    }, [board])

    return (
        <div className='flex items-center justify-center px-5 py-2 md:py-5'>
            <p className='flex items-center p-5 text-sm font-light pr-5 shadow-xl rounded-xl
                                w-fit bg-white italic max-w-3xl text-[#196986]'>
                <UserCircleIcon className={`inline-block h-10 w-10 text-[#196986] mr-1 
                                        ${isLoading && 'animate-spin'}`} />
                {
                    suggestion && !isLoading
                        ? suggestion
                        :'GPT is summarising your todos for the day...'
                }
            </p>
        </div>
    )
}

export default Gpt