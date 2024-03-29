import { Pie } from 'react-chartjs-2';
const colors = {
    rightBg: 'rgba(54, 162, 235, 0.2)',
    wrongBg: 'rgba(255, 99, 132, 0.2)',
    rightBorder: 'rgba(54, 162, 235, 1)',
    wrongBorder: 'rgba(255, 99, 132, 1)',
}
const Chart = ({ correctAnswersCount, questionsCount }: { correctAnswersCount: number, questionsCount: number }) => {

    const data = {
        labels: ['Right Answer', "Wrong Answer"],
        datasets: [
            {
                label: 'Your result',
                data: [correctAnswersCount, questionsCount - correctAnswersCount],
                backgroundColor: [
                    colors.rightBg,
                    colors.wrongBg,
                ],
                borderColor: [
                    colors.rightBorder,
                    colors.wrongBorder,
                ],
                borderWidth: 1,
            },
        ],
    };


    return (
        <div className='bg-white w-full h-full flex justify-center mb-[50px] p-[50px]'>
            <div className='flex flex-col justify-center items-center w-[400px] h-[400px] bg-white '>
                <h1>Your result</h1>
                <Pie data={data} />
            </div>
        </div>)
}

export default Chart