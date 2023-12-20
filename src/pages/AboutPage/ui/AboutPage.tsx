import React from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';

import cls from "./AboutPage.module.scss";

const AboutPage = () => {
    const { t } = useTranslation('about');
    return (
    <Page data-testid="AboutPage">
        <Card fullHeight padding="24" className={cls.wrapper} fullWidth>
            <Text title={t('Про нас:')} size="l" />
            <br />
            <Text text={t('Наше приложение...')} size="m" />
            <br />
            <Text title={t('Наша миссия')} size="l" />
            <br />
            <Text text={t('Наша цель...')} size="m" />
            <br />
            <Text title={t('Наши источники')} size="l" />
            <br />
            <Text text={t('Мы используем...')} size="m" />
            <br />
            <Text title={t('Свяжитесь с нами')} size="l" />
            <br />
            <Text text={t('Для вопросов...')} size="m" />
            <br />
        </Card>
    </Page>
)};

export default AboutPage;
