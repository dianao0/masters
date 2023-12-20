/* eslint-disable i18next/no-literal-string */
import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { Card } from '@/shared/ui/redesigned/Card';
import { dataUkraine } from "../data/ukraine"
import { usConfirmed } from "../data/usa_confirmed"
import { usDeaths } from "../data/usa_deaths"
import { predict } from "../data/predict90"
import cls from "./MainPage.module.scss";
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import img from "@/shared/assets/img/covid-02-01.png"

HighchartsMore(Highcharts);

const MainPage = () => {
    const { t } = useTranslation();
    const [value, setValue] = useState('');
    const [queryResult, setQueryResult] = useState(null);
    const processedData = dataUkraine.map((item: any) => {
        return [new Date(item.date).getTime(), parseInt(item.num_reports, 10)];
    });
    const processedData2 = usConfirmed.map(item => ({
        name: item.state_name,
        y: parseInt(item.confirmed_cases, 10)
    }));
    const processedUsDeaths = usDeaths.map(item => ({
        name: item.state_name,
        y: parseInt(item.deaths, 10)
    }));
    const processedPredictionData = predict.map(item => ({
        x: new Date(item.forecast_timestamp).getTime(),
        y: parseFloat(item.forecast_value),
        low: parseFloat(item.prediction_interval_lower_bound),
        high: parseFloat(item.prediction_interval_upper_bound)
    }));

    const options = {
        title: {
            text: t('Кількість зафіксованих випадків в Україні'),
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: t('Дата'),
            },
        },
        yAxis: {
            title: {
                text: t('Кількість захворювань'),
            },
        },
        series: [
            {
                name: t('Зафіксовані випадки'),
                data: processedData,
            },
        ],
    };

    const options2 = {
        chart: {
            type: 'column'
        },
        title: {
            text: t('Розподіл підтверджених випадків по штатам')
        },
        xAxis: {
            type: 'category',
            title: {
                text: t('Штат')
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: t('Кількість захворювань')
            }
        },
        series: [{
            name: t('Зафіксовані випадки'),
            data: processedData2
        }]
    };

    const options3 = {
        chart: {
            type: 'column'
        },
        title: {
            text: t('Кількість смертельних випадків по штатам')
        },
        xAxis: {
            type: 'category',
            title: {
                text: t('Штат')
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: t('Кількість смертельних випадків')
            }
        },
        series: [{
            name: t('Зафіксовані випадки'),
            data: processedUsDeaths
        }]
    };
    const options4 = {
        title: {
            text: t('Прогнозування димаміки захворюваності Covid-19')
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: t('Дата')
            }
        },
        yAxis: {
            title: {
                text: t('Значення')
            }
        },
        series: [
            {
                name: t('Прогнозоване значення'),
                data: processedPredictionData.map(item => [item.x, item.y]),
                zIndex: 1,
                marker: {
                    fillColor: 'white',
                    lineWidth: 2,
                },
                type: 'line'
            },
            {
                name: t('Діапазон прогнозу'),
                data: processedPredictionData.map(item => [item.x, item.low, item.high]),
                type: 'arearange',
                lineWidth: 0,
                linkedTo: ':previous',
                fillOpacity: 0.3,
                zIndex: 0
            }
        ]
    };
    const onChange = (val: string) => {
        setValue(val);
    };

    useEffect(() => {
        fetch('https://bigquery.googleapis.com/bigquery/v2/projects/witcher-factory-50733/queries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // eslint-disable-next-line max-len
                'Authorization': 'Bearer ya29.a0AfB_byA-F2x6m7-qT9iXbSSX3qtMIZtQwhq4cX4qWhJNnOaMN-Rrni0v3QIONB0-Wn-zGZ8F5y0z0VR3ICRwQjQARg81hIDUazjXzkOqIv-BFkXdoBlqTJ_nCOKcn35p2dTT960ZJa9TgJ-7xyKIuEKjVcQ9S2SLepwlwVmAhAaCgYKAcUSARESFQHGX2MimnXv3LjVeIFVejbVpiZ8CQ0177'
            },
            body: JSON.stringify({
                // eslint-disable-next-line max-len
                query: "#standardSQL\nSELECT date, SUM(confirmed) AS num_reports FROM bigquery-public-data.covid19_open_data.compatibility_view WHERE country_region = 'Ukraine' GROUP BY date HAVING num_reports IS NOT NULL ORDER BY date ASC",
                useLegacySql: false,
            }),
        })
            .then((response) => response.json())
            .then((data) => setQueryResult(data))
            .catch((error) => console.error('Error:', error));
    }, []);
    
    return (
        <Page data-testid="MainPage"
        >
            <VStack max gap='16'>
            <Card className={cls.a}>
            <HStack max align="end" justify='between' className={cls.greet}>
                 <VStack gap='8'>
                 <h1>{t('Привіт, Diana')}</h1>
                 <h2>{t('Ваша статистика по Covid-19')}</h2>
                 </VStack>
                 <img className={cls.greet_image} src={img} alt='covid'/>
            </HStack>

            </Card >
                <Card className={cls.b}>
                    <HighchartsReact highcharts={Highcharts} options={options} />
                </Card>
                <Card className={cls.b}>
                    <HighchartsReact highcharts={Highcharts} options={options2} />
                </Card>
                <Card className={cls.b}>
                    <HighchartsReact highcharts={Highcharts} options={options3} />
                </Card>
                <Card className={cls.b}>
                    <HighchartsReact highcharts={Highcharts} options={options4} />
                </Card>
            </VStack>
            
        </Page>
    );
};

export default MainPage;
