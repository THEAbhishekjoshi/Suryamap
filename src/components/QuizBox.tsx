import { useEffect, useState } from 'react'

const QuizBox = () => {
    const funFactUrl: string = '/FunFact.json'
    const [facts, setFacts] = useState<Record<string, string>[]>([])
    useEffect(() => {
        fetch(funFactUrl)
            .then((res) => res.json()
                .then((d) => setFacts(d))
            )
    }, [])

    const [fact1, setFact1] = useState("🌞 India ranks among the top 5 countries in the world for total installed solar power capacity.")
    // const [fact2, setFact2] = useState("")

    useEffect(() => {
        const interval = setInterval(() => {
            const idx1 = Math.floor(Math.random() * facts.length)
            setFact1(facts[idx1].icon + ' ' + facts[idx1].fact)

        }, 10000)
        return () => clearInterval(interval);
    }, [facts])

    return (
        <div className='w-full h-full flex flex-col items-center'>
            <div className='text-center text-white font-medium uppercase mt-0.5'>Fun Facts</div>
            <div className='bg-white/20 rounded-md p-2 backdrop-blur-sm hover:bg-white/30 transition-colors w-[16rem] h-[7rem] '>
                <div className='flex flex-col gap-2 text-sm text-white  animate-bounce mt-3 '>
                    <div>{fact1}</div>
                </div>
            </div>
        </div>
    )
}

export default QuizBox