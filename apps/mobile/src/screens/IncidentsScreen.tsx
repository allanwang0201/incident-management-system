import React from 'react';
import { View, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import {
  Appbar,
  List,
  Card,
  Chip,
  Title,
  Paragraph,
  ActivityIndicator,
  Text,
  useTheme,
  IconButton,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  useIncidents,
  useIncidentStore,
  formatDateTimeShort,
  getPriorityLabel,
} from '@incident-system/shared';

export function IncidentsScreen() {
  const theme = useTheme();
  const { themeMode, toggleTheme } = useIncidentStore();
  const { data: incidents = [], isLoading, error, refetch } = useIncidents();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const getPriorityColor = (priority: 1 | 2 | 3) => {
    switch (priority) {
      case 1:
        return theme.colors.error;
      case 2:
        return theme.colors.tertiary;
      case 3:
        return theme.colors.primary;
      default:
        return theme.colors.onSurface;
    }
  };

  const getPriorityIcon = (priority: 1 | 2 | 3) => {
    switch (priority) {
      case 1:
        return 'alert-circle';
      case 2:
        return 'alert';
      case 3:
        return 'information';
      default:
        return 'help-circle';
    }
  };

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="Incidents" />
        </Appbar.Header>
        <View style={styles.centerContent}>
          <Text>Error loading incidents</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Incidents - Mobile" />
        <IconButton
          icon={themeMode === 'dark' ? 'weather-sunny' : 'weather-night'}
          onPress={toggleTheme}
        />
      </Appbar.Header>

      {isLoading && !refreshing ? (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {incidents.length === 0 ? (
            <View style={styles.centerContent}>
              <Text>No incidents found</Text>
            </View>
          ) : (
            incidents.map((incident) => (
              <Card key={incident.id} style={styles.card}>
                <Card.Content>
                  <View style={styles.cardHeader}>
                    <List.Icon
                      icon={getPriorityIcon(incident.priority)}
                      color={getPriorityColor(incident.priority)}
                    />
                    <View style={styles.cardHeaderText}>
                      <Title>{incident.name}</Title>
                      <Chip
                        mode="outlined"
                        compact
                        textStyle={{ fontSize: 12, lineHeight: 14 }}
                        style={[
                          styles.priorityChip,
                          { borderColor: getPriorityColor(incident.priority) },
                        ]}
                      >
                        {getPriorityLabel(incident.priority)}
                      </Chip>
                    </View>
                  </View>
                  <Paragraph>{formatDateTimeShort(incident.datetime)}</Paragraph>
                  <Paragraph>Location: {incident.locationName}</Paragraph>
                  {incident.description && (
                    <Paragraph style={styles.description}>{incident.description}</Paragraph>
                  )}
                </Card.Content>
              </Card>
            ))
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    margin: 8,
    marginHorizontal: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardHeaderText: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priorityChip: {
    // Use default height from react-native-paper; compact reduces height appropriately
  },
  description: {
    marginTop: 8,
    fontStyle: 'italic',
  },
});
