import React, { useCallback, useState, useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeArea } from '../../components/lib/SafeArea';
import { CustomInput, ViewCenter } from '../../components/lib/general';
import { Spacer } from '../../components/lib/Spacer';
import { Size } from '../../theme/sizes';
import { CustomButton } from '../../components/lib/Buttons';
import { Records } from '../../services/records/types';
import { AuthenticationContext } from '../../services/auth/Authentication';
import { getCategoriesService } from '../../services/records/categoryServices';
import { Category } from './types';

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
  },
  recordButton: {
    maxHeight: 50,
  },
  pickerContainer: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
  },
});

const NewRecordScreen = (): JSX.Element => {
  const [recordType, setRecordType] = useState<Records>(Records.EXPENSE);

  const [categories, setCategories] = useState<Category[]>([]);
  const [formState, setFormState] = useState({
    category: '',
  });

  const { user } = useContext(AuthenticationContext);

  const getCategories = useCallback(async () => {
    try {
      if (user !== null) {
        const response = await getCategoriesService(user.userId, user.token);
        setCategories(response.data);
      }
    } catch (err) {
      // TODO handle error
    }
  }, [user]);

  useEffect(() => {
    if (user !== null) {
      getCategories();
    }
  }, [user, getCategories]);

  return (
    <SafeArea>
      <ViewCenter>
        <View style={styles.buttonsContainer}>
          <CustomButton
            style={styles.recordButton}
            mode={recordType === Records.EXPENSE ? 'contained' : 'outlined'}
            compact
            onPress={() => setRecordType(Records.EXPENSE)}
          >
            {Records.EXPENSE}
          </CustomButton>
          <Spacer size={Size.MEDIUM} />
          <CustomButton
            style={styles.recordButton}
            mode={recordType === Records.INCOME ? 'contained' : 'outlined'}
            compact
            onPress={() => setRecordType(Records.INCOME)}
          >
            {Records.INCOME}
          </CustomButton>
        </View>
        <Spacer size={Size.SMALL} />
        <CustomInput label="Amount" keyboardType="numeric" />
        <Spacer size={Size.SMALL} />
        <CustomInput label="Description" keyboardType="default" />
        {/* <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formState.category}
            onValueChange={itemValue =>
              setFormState({ ...formState, category: itemValue })
            }
          >
            {categories.map((category: Category) => (
              <Picker.Item
                key={category.id}
                label={category.name}
                value={category.name}
              />
            ))}
          </Picker>
        </View> */}
      </ViewCenter>
    </SafeArea>
  );
};

export default NewRecordScreen;
