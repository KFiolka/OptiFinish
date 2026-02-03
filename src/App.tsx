import { AppLayout } from './components/layout/AppLayout';
import { DashboardScreen } from './features/dashboard/DashboardScreen';

function App() {
  return (
    <AppLayout>
      <DashboardScreen />
    </AppLayout>
  )
}

export default App;
