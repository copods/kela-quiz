import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import moment from 'moment'

const BarGraph = ({ sectionWiseResult }: { sectionWiseResult: any }) => {
  console.log(sectionWiseResult)
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

  const getSectionsFromResult = sectionWiseResult.map(
    (result: any) => result.test.sections
  )
  let result: Array<number> = []
  for (let j = 0; j < getSectionsFromResult.length; j++) {
    for (let k = 0; k < getSectionsFromResult[j].length; k++) {
      if (
        sectionWiseResult[j].section.section.id ===
        getSectionsFromResult[j][k].section.id
      ) {
        result.push(Math.floor(getSectionsFromResult[j][k].timeInSeconds / 60))
      }
    }
  }

  // const getLabelData = (sectionName: string, resultKind: string) => {
  //   const getRequiredSection = sectionWiseResult.find(
  //     (result: any) => result.section.section.name === sectionName
  //   )
  //   if (resultKind === 'total') {
  //     return getRequiredSection.totalQuestion
  //   } else if (resultKind === 'correct') {
  //     return getRequiredSection.correctQuestion
  //   } else if (resultKind === 'wrong') {
  //     return getRequiredSection.unanswered
  //   }
  // }

  const options = {
    chart: {
      type: 'column',
    },
    title: {
      text: '',
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
      //     return (
      //       curr.key +
      //       '<br/>' +
      //       'Total' +
      //       ' : ' +
      //       getLabelData(curr.key, 'total') +
      //       '<br/>' +
      //       'Correct' +
      //       ' : ' +
      //       getLabelData(curr.key, 'correct') +
      //       '<br/>' +
      //       'Wrong' +
      //       ' : ' +
      //       getLabelData(curr.key, 'wrong') +
      //       '<br/>'
      //     )
      //   })
      // },
    },
    plotOptions: {
      column: {
        grouping: false,
        shadow: false,
        borderWidth: 0,
      },
    },
    series: [
      {
        showInLegend: false,
        name: sectionWiseResult.map(
          (result: any) => result.section.section.name
        ),
        color: '#F3F4F6',
        data: result,
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
    <div className="rounded-lg border bg-white pt-3">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}

export default BarGraph
