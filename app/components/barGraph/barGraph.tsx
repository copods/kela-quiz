import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import moment from 'moment'

const BarGraph = ({ sectionWiseResult }: { sectionWiseResult: any }) => {
  const getDifferenceMin = () => {
    let finalResult: Array<number> = []
    sectionWiseResult.map((result: any) => {
      let startingTime = moment(result.section.startedAt)
      let endingTime = moment(result.section.endAt)

      let difference = endingTime.diff(startingTime)

      finalResult.push(parseFloat((difference / 60000).toFixed(1)))
    })

    return finalResult
  }

  const value = [
    {
      name: 'abc',
      total: 5,
      correct: 3,
      totalTimeInSeconds: 10,
      timeTakenInSeconds: 50,
    },
    {
      name: 'abcd',
      total: 4,
      correct: 3,
      totalTimeInSeconds: 10,
      timeTakenInSeconds: 20,
    },
    {
      name: 'abcde',
      total: 4,
      correct: 3,
      totalTimeInSeconds: 10,
      timeTakenInSeconds: 40,
    },
  ]

  const options = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Efficiency Optimization by Branch',
    },
    xAxis: {
      categories: sectionWiseResult.map(
        (result: any) => result.section.section.name
      ),
      overflow: 'auto',
    },
    yAxis: [
      {
        min: 0,
        title: {
          text: 'Time (in min)',
        },
      },
    ],
    legend: {
      shadow: false,
    },
    tooltip: {
      shared: true,
      // formatter: function () {
      //   return this.points.reduce((acc: any, curr: any) => {
      //     console.log(curr)
      //     return acc + '<br/>' + curr?.x `${i+1}` + ': ' + +'m'
      //   }, '<b>' + '</b>')
      // },
    },
    plotOptions: {
      column: {
        grouping: false,
        shadow: false,
        borderWidth: 0,
      },
    },
    // point: {
    //   events: {
    //     mouseOver() {
    //       let series = this.series;

    //       series.points.forEach(p => {
    //         p.graphic.css({
    //           opacity: 0.3
    //         })
    //       })

    //       this.graphic.css({
    //         opacity: 1
    //       })
    //     },
    //     mouseOut() {
    //                 let series = this.series;

    //       series.points.forEach(p => {
    //         p.graphic.css({
    //           opacity: 1
    //         })
    //       })
    //     }
    //   }
    // },
    series: [
      {
        showInLegend: false,
        name: sectionWiseResult.map(
          (result: any) => result.section.section.name
        ),
        color: '#F3F4F6',
        data: value.map((el) => el.totalTimeInSeconds),
        states: {
          hover: {
            color: '#F3F4F6',
          },
        },
      },
      {
        showInLegend: false,
        name: sectionWiseResult.map(
          (result: any) => result.section.section.name
        ),
        color: '#353988',
        data: getDifferenceMin(),
        states: {
          hover: {
            color: '#353988',
          },
        },
      },
    ],
  }

  return (
    <div className="rounded-lg border">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}

export default BarGraph
