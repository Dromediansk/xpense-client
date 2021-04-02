import { Text } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ViewCenter } from '../../components/lib/ViewCenter';
import { CustomButton } from '../../components/lib/Buttons';
import {
  getRecordsService,
  Records,
} from '../../services/records/recordServices';
import { AuthenticationContext } from '../../services/auth/Authentication';

type Props = {
  navigation: any;
  selectedDate: string;
};

const DashboardScreen = ({ navigation, selectedDate }: Props): JSX.Element => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

  const { user } = useContext(AuthenticationContext);

  const getRecords = useCallback(async () => {
    try {
      if (user?.userId && user.token) {
        const expensesResponse = await getRecordsService(
          Records.EXPENSES,
          user.userId,
          user.token,
          { dateFrom: '2021-01-01', dateTo: '2021-03-01' },
        );
        setExpenses(expensesResponse.data);

        const incomesResponse = await getRecordsService(
          Records.INCOMES,
          user.userId,
          user.token,
          { dateFrom: '2021-01-01', dateTo: '2021-03-01' },
        );
        setIncomes(incomesResponse.data);
      }
    } catch (err) {
      // TODO handle error
    }
  }, [user]);

  useEffect(() => {
    if (user?.userId && user.token) getRecords();
  }, [user, getRecords]);

  return (
    <ViewCenter>
      <Text>Dashboard Screen</Text>
      <CustomButton onPress={() => navigation.navigate('AddRecord')}>
        Add record
      </CustomButton>
    </ViewCenter>
  );
};

export default DashboardScreen;
