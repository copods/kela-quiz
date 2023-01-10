import Highcharts from 'highcharts'
import type { TooltipFormatterContextObject } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import moment from 'moment'
import type {
  SectionInCandidateTest,
  SectionInTest,
  SectionWiseResults,
} from '~/interface/Interface'

const BarGraph = ({
  candidateTestResult,
}: {
  candidateTestResult: SectionInCandidateTest[]
}) => {
  const calculateResult = candidateTestResult.filter(
    (data: SectionInCandidateTest) => {
      return data.SectionWiseResult.length > 0
    }
  )
  const getDifferenceMin = () => {
    let finalResult: Array<number> = []
    calculateResult.forEach((result: SectionInCandidateTest) => {
      result.SectionWiseResult.forEach((data: SectionWiseResults) => {
        const startingTime = moment(data?.section?.startedAt)
        const endingTime = moment(data?.section?.endAt)
        const difference = endingTime.diff(startingTime)
        finalResult.push(parseFloat((difference / 60000).toFixed(1)))
      })
    })

    return finalResult
  }
  let result: Array<number> = []
  calculateResult.map((data: SectionInCandidateTest) => {
    return data.SectionWiseResult?.map((results: SectionWiseResults) => {
      const sectionInTestData = results.section.section.sectionInTest.map(
        (data: SectionInTest) => {
          return data
        }
      )
      result.push(Math.floor(sectionInTestData[0].timeInSeconds / 60))
    })
  })
  const getLabelData = (sectionName: string, resultKind: string) => {
    const getRequiredSection = calculateResult.filter(
      (result: SectionInCandidateTest) => {
        return result?.section?.name === sectionName
      }
    )
    if (resultKind === 'total') {
      return getRequiredSection[0]?.SectionWiseResult[0]?.totalQuestion
    } else if (resultKind === 'correct') {
      return getRequiredSection[0]?.SectionWiseResult[0]?.correctQuestion
    } else if (resultKind === 'skipped') {
      return (
        (getRequiredSection[0]?.SectionWiseResult[0]?.totalQuestion as number) -
        (getRequiredSection[0]?.SectionWiseResult[0]?.correctQuestion as number)
      )
    }
  }
  const options: Highcharts.Options = {
    chart: {
      type: 'column',
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: calculateResult.map((result: SectionInCandidateTest) => {
        return result?.section.name
      }),
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
    accessibility: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      backgroundColor: '#fff',
      borderRadius: 10,
      shadow: true,
      padding: 15,
      followTouchMove: true,
      formatter: function (): any {
        return this.points?.reduce(
          (
            acc: TooltipFormatterContextObject
          ): TooltipFormatterContextObject => {
            return ('<div>' +
              'Total' +
              ': ' +
              '<span style="color: #353988; fontWeight: 500; margin: 20px">' +
              getLabelData(acc.key as string, 'total') +
              '</span>' +
              '<div/> </br>' +
              '<div>' +
              'Correct' +
              ': ' +
              '<span style="color: #059669; fontWeight: 500; margin: 20px">' +
              getLabelData(acc.key as string, 'correct') +
              '</span>' +
              '<div/> </br>' +
              '<div>' +
              'Skipped' +
              ': ' +
              '<span style="color: #D97706; fontWeight: 500; margin: 20px">' +
              getLabelData(acc.key as string, 'skipped') +
              '</span>' +
              '<div/>') as unknown as TooltipFormatterContextObject
          }
        )
      },
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
        color: '#F3F4F6',
        data: result,
        states: {
          hover: {
            color: '#F3F4F6',
          },
        },
        type: 'column',
      },
      {
        showInLegend: false,
        color: '#353988',
        data: getDifferenceMin(),
        states: {
          hover: {
            color: '#353988',
          },
        },
        type: 'column',
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
