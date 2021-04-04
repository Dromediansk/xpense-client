/* eslint-disable react/prop-types */
import {
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { ViewCenter } from '../../components/lib/general';
import { CustomButton } from '../../components/lib/Buttons';
import { RootDrawerParamList } from './types';
import { colors } from '../../theme/colors';
import { getRecordsService } from '../../services/records/recordServices';
import { AuthenticationContext } from '../../services/auth/Authentication';
import { Record } from '../../services/records/types';

type DashboardDrawerNavigationProp = DrawerNavigationProp<
  RootDrawerParamList,
  'Dashboard'
>;
type Props = {
  navigation: DashboardDrawerNavigationProp;
};

interface ItemProps {
  item: Record;
  onPress: (event: GestureResponderEvent) => void;
  borderColor: {
    borderColor: string;
  };
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const DashboardScreen = ({ navigation }: Props): JSX.Element => {
  const [selectedId, setSelectedId] = useState<number>(0);
  const [records, setRecords] = useState<Record[]>([]);

  const { user } = useContext(AuthenticationContext);

  useEffect(() => {
    if (user !== null) {
      (async () => {
        try {
          const recordsResponse = await getRecordsService(
            user.userId,
            user.token,
            {
              dateFrom: '2021-01-01',
              dateTo: '2021-05-01',
            },
          );
          setRecords(recordsResponse.data);
        } catch (err) {
          return err;
        }
      })();
    }
  }, [user]);

  const Item = ({ item, onPress, borderColor }: ItemProps) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, borderColor]}>
      <Text>{item.description}</Text>
      <Text>{item.amount}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }: { item: Record }): JSX.Element => {
    const borderColor =
      item.id === selectedId ? colors.ui.primary : colors.ui.secondary;

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        borderColor={{ borderColor }}
      />
    );
  };

  return (
    <>
      <FlatList
        data={records}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        extraData={selectedId}
      />
      <ViewCenter>
        <Text>Dashboard Screen</Text>
        <CustomButton onPress={() => navigation.navigate('NewRecord')}>
          Add record
        </CustomButton>
      </ViewCenter>
    </>
  );
};

export default DashboardScreen;
