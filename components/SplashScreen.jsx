import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ onComplete, theme }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const dataOpacity = useRef(new Animated.Value(0)).current;
  const logoRotate = useRef(new Animated.Value(0)).current;

  const steps = [
    "Initializing System...",
    "Loading Data Modules...",
    "Setting up Analytics...",
    "Configuring Business Logic...",
    "Preparing Dashboard...",
    "Ready to Launch!"
  ];

  const dataMetrics = [
    { label: "Sales Records", value: "1,247", color: "#10b981" },
    { label: "Inventory Items", value: "856", color: "#3b82f6" },
    { label: "Transactions", value: "3,429", color: "#f59e0b" },
    { label: "Active Users", value: "142", color: "#8b5cf6" }
  ];

  useEffect(() => {
    // Initial animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();

    // Logo rotation animation
    Animated.loop(
      Animated.timing(logoRotate, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();

    // Step progression
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          // Show data animation after steps complete
          setTimeout(() => {
            Animated.timing(dataOpacity, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }).start();
          }, 500);
          
          // Complete splash after showing data
          setTimeout(() => {
            onComplete();
          }, 3000);
          return prev;
        }
      });
    }, 600);

    // Progress bar animation
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 4200, // Total time for all steps
      useNativeDriver: false,
    }).start();

    return () => clearInterval(stepInterval);
  }, []);

  const logoRotateInterpolate = logoRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  });

  return (
    <View style={{
      flex: 1,
      backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative'
    }}>
      {/* Animated Background Particles */}
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#1e293b'
      }}>
        {[...Array(20)].map((_, i) => (
          <Animated.View
            key={i}
            style={{
              position: 'absolute',
              width: 4,
              height: 4,
              backgroundColor: '#667eea',
              borderRadius: 2,
              opacity: 0.6,
              top: Math.random() * height,
              left: Math.random() * width,
              transform: [{
                scale: scaleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, Math.random() * 1.5 + 0.5]
                })
              }]
            }}
          />
        ))}
      </View>

      {/* Main Content */}
      <Animated.View style={{
        alignItems: 'center',
        opacity: fadeAnim,
        transform: [
          { scale: scaleAnim },
          { translateY: slideAnim }
        ]
      }}>
        {/* Logo */}
        <Animated.View style={{
          width: 120,
          height: 120,
          backgroundColor: '#667eea',
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 40,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.3,
          shadowRadius: 20,
          elevation: 10,
          transform: [{ rotate: logoRotateInterpolate }]
        }}>
          <Text style={{
            fontSize: 40,
            color: 'white',
            fontWeight: '700'
          }}>
            📊
          </Text>
        </Animated.View>

        {/* App Name */}
        <Text style={{
          fontSize: 32,
          fontWeight: '700',
          color: 'white',
          marginBottom: 8,
          textAlign: 'center'
        }}>
          BusinessApp
        </Text>

        <Text style={{
          fontSize: 16,
          color: '#e2e8f0',
          marginBottom: 60,
          textAlign: 'center'
        }}>
          Your Complete Business Solution
        </Text>

        {/* Loading Steps */}
        <View style={{
          alignItems: 'center',
          marginBottom: 40
        }}>
          <Text style={{
            fontSize: 16,
            color: '#e2e8f0',
            marginBottom: 20,
            minHeight: 20
          }}>
            {steps[currentStep]}
          </Text>

          {/* Progress Bar */}
          <View style={{
            width: 280,
            height: 6,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 3,
            overflow: 'hidden'
          }}>
            <Animated.View style={{
              height: '100%',
              width: progressWidth,
              backgroundColor: '#10b981',
              borderRadius: 3
            }} />
          </View>

          <Text style={{
            fontSize: 12,
            color: '#94a3b8',
            marginTop: 8
          }}>
            {Math.round((currentStep + 1) / steps.length * 100)}% Complete
          </Text>
        </View>

        {/* Data Metrics Animation */}
        <Animated.View style={{
          opacity: dataOpacity,
          width: '100%',
          paddingHorizontal: 40
        }}>
          <Text style={{
            fontSize: 18,
            color: 'white',
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: 20
          }}>
            Loading Your Business Data
          </Text>

          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: 12
          }}>
            {dataMetrics.map((metric, index) => (
              <Animated.View
                key={metric.label}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  padding: 16,
                  borderRadius: 12,
                  borderLeftWidth: 4,
                  borderLeftColor: metric.color,
                  width: '48%',
                  transform: [{
                    translateY: dataOpacity.interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0]
                    })
                  }],
                  opacity: dataOpacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1]
                  })
                }}
              >
                <Text style={{
                  fontSize: 24,
                  fontWeight: '700',
                  color: metric.color,
                  marginBottom: 4
                }}>
                  {metric.value}
                </Text>
                <Text style={{
                  fontSize: 12,
                  color: '#e2e8f0',
                  fontWeight: '500'
                }}>
                  {metric.label}
                </Text>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* Loading Dots */}
        <View style={{
          flexDirection: 'row',
          marginTop: 40,
          gap: 8
        }}>
          {[0, 1, 2].map((i) => (
            <Animated.View
              key={i}
              style={{
                width: 8,
                height: 8,
                backgroundColor: '#667eea',
                borderRadius: 4,
                opacity: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.3, 1]
                }),
                transform: [{
                  scale: scaleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1]
                  })
                }]
              }}
            />
          ))}
        </View>
      </Animated.View>

      {/* Version Info */}
      <Animated.View style={{
        position: 'absolute',
        bottom: 40,
        opacity: fadeAnim
      }}>
        <Text style={{
          fontSize: 12,
          color: '#94a3b8',
          textAlign: 'center'
        }}>
          Version 2.1.0 • Built with React Native
        </Text>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
