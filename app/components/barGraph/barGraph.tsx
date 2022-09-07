import Highcharts from 'highcharts'
import type { TooltipFormatterContextObject } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import moment from 'moment'
import React from 'react'
import type { SectionWiseResults } from '~/interface/Interface'

const BarGraph = ({
  sectionWiseResult,
}: {
  sectionWiseResult: Array<SectionWiseResults>
}) => {
  console.log(sectionWiseResult)
  const getDifferenceMin = () => {
    let finalResult: Array<number> = []
    sectionWiseResult.map((result: SectionWiseResults) => {
      let startingTime = moment(result.section.startedAt)
      let endingTime = moment(result.section.endAt)

      let difference = endingTime.diff(startingTime)

      finalResult.push(parseFloat((difference / 60000).toFixed(1)))
    })

    return finalResult
  }

  const getSectionsFromResult = sectionWiseResult.map(
    (result: SectionWiseResults) => result.test.sections
  )
  let result: Array<number> = []

  // finding specific section in data
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

  const getLabelData = (sectionName: string, resultKind: string) => {
    const getRequiredSection = sectionWiseResult.find(
      (result: SectionWiseResults) =>
        result.section.section.name === sectionName
    )
    if (resultKind === 'total') {
      return getRequiredSection?.totalQuestion
    } else if (resultKind === 'correct') {
      return getRequiredSection?.correctQuestion
    } else if (resultKind === 'wrong') {
      return getRequiredSection?.unanswered
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
      categories: sectionWiseResult.map(
        (result: SectionWiseResults) => result.section.section.name
      ),
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
      formatter: function (): any {
        return this.points?.reduce(
          (
            acc: TooltipFormatterContextObject
          ): TooltipFormatterContextObject => {
            return (acc.key +
              '<br/>' +
              'Total' +
              ' : ' +
              getLabelData(acc.key as string, 'total') +
              '<br/>' +
              'Correct' +
              ' : ' +
              getLabelData(acc.key as string, 'correct') +
              '<br/>' +
              'Wrong' +
              ' : ' +
              getLabelData(acc.key as string, 'wrong') +
              '<br/>') as unknown as TooltipFormatterContextObject
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
