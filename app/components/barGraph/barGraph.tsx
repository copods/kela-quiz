import { useRef } from "react";

import moment from "moment";

import { ClientOnly } from "remix-utils/client-only";

import { HighchartsReact, Highcharts } from "~/components/highcharts.client";

import type {
  SectionInCandidateTest,
  SectionWiseResults,
} from "~/interface/Interface";


interface BarGraphProps {
  candidateTestResult: SectionInCandidateTest[];
}

const BarGraph: React.FC<BarGraphProps> = ({ candidateTestResult }) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const calculateResult = candidateTestResult.filter(
    (data: SectionInCandidateTest) => data.SectionWiseResult.length > 0
  );

  const getDifferenceMin = (): number[] => {
    const finalResult: number[] = [];
    calculateResult.forEach((result: SectionInCandidateTest) => {
      result.SectionWiseResult.forEach((data: SectionWiseResults) => {
        const startingTime = moment(data?.section?.startedAt);
        const endingTime = moment(data?.section?.endAt);
        const difference = endingTime.diff(startingTime);
        finalResult.push(parseFloat((difference / 60000).toFixed(1)));
      });
    });
    return finalResult;
  };

  const getAllotedTimes = (): number[] => {
    const result: number[] = [];
    calculateResult.forEach((data) => {
      data.SectionWiseResult?.forEach((results) => {
        const sectionInTestData = results.section.section.sectionInTest[0];
        result.push(Math.floor(sectionInTestData.timeInSeconds / 60));
      });
    });
    return result;
  };

  const getLabelData = (sectionName: string, resultKind: "total" | "correct" | "skipped"): number => {
    const getRequiredSection = calculateResult.find(
      (result) => result?.section?.name === sectionName
    );

    if (!getRequiredSection?.SectionWiseResult[0]) return 0;

    const sectionResult = getRequiredSection.SectionWiseResult[0];

    switch (resultKind) {
      case "total":
        return sectionResult.totalQuestion ?? 0;
      case "correct":
        return sectionResult.correctQuestion ?? 0;
      case "skipped":
        return (sectionResult.totalQuestion ?? 0) - (sectionResult.correctQuestion ?? 0);
      default:
        return 0;
    }
  };

  const options: Highcharts.Options = {
    chart: {
      type: "column",
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: calculateResult.map((result) => result?.section.name),
    },
    yAxis: [{
      min: 0,
      title: {
        text: "Time (in min)",
      },
    }],
    legend: {
      shadow: false,
    },
    accessibility: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      backgroundColor: "#fff",
      borderRadius: 10,
      shadow: true,
      padding: 15,
      followTouchMove: true,
      formatter: function (this: Highcharts.TooltipFormatterContextObject): string {
        if (!this.points) return "";

        const point = this.points[0];
        const sectionName = point.key as string;

        return `
          <div style="font-family: system-ui, sans-serif;">
            <div style="margin-bottom: 8px">
              <span style="color: #666">Total:</span>
              <span style="color: #353988; font-weight: 500; margin-left: 8px">
                ${getLabelData(sectionName, "total")}
              </span>
            </div>
            <div style="margin-bottom: 8px">
              <span style="color: #666">Correct:</span>
              <span style="color: #059669; font-weight: 500; margin-left: 8px">
                ${getLabelData(sectionName, "correct")}
              </span>
            </div>
            <div>
              <span style="color: #666">Skipped:</span>
              <span style="color: #D97706; font-weight: 500; margin-left: 8px">
                ${getLabelData(sectionName, "skipped")}
              </span>
            </div>
          </div>`;
      }
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
        name: "Alloted Time",
        showInLegend: false,
        color: "#F3F4F6",
        data: getAllotedTimes(),
        states: {
          hover: {
            color: "#F3F4F6",
          },
        },
        type: "column",
      },
      {
        name: "Time Taken",
        showInLegend: false,
        color: "#353988",
        data: getDifferenceMin(),
        states: {
          hover: {
            color: "#353988",
          },
        },
        type: "column",
      },
    ],
  };

  return (
    <div className="rounded-lg border bg-white pt-3">
      <ClientOnly fallback={<p>Loading...</p>}>
        {() => (
          <div>
            <HighchartsReact highcharts={Highcharts} options={options} ref={chartComponentRef} />
          </div>
        )}
      </ClientOnly>
    </div>
  );
};

export default BarGraph;