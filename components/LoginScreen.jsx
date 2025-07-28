import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Animated, Alert, Keyboard } from 'react-native';

const LoginScreen = ({ onLogin, onSkip, theme }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    // Initial animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();

    // Keyboard listeners
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = async () => {
    // Basic validation
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (isSignUp && formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      
      // Mock user data
      const userData = {
        name: formData.name || 'Business User',
        email: formData.email,
        avatar: null
      };
      
      onLogin(userData);
    }, 1500);
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    
    // Animate transition
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start();
  };

  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: theme.bg }}
      contentContainerStyle={{ 
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 40
      }}
      keyboardShouldPersistTaps="handled"
    >
      <Animated.View style={{
        opacity: fadeAnim,
        transform: [
          { translateY: slideAnim },
          { scale: scaleAnim }
        ]
      }}>
        {/* Header */}
        <View style={{ 
          alignItems: 'center', 
          marginBottom: keyboardVisible ? 20 : 40
        }}>
          {/* Logo */}
          <View style={{
            width: keyboardVisible ? 60 : 80,
            height: keyboardVisible ? 60 : 80,
            backgroundColor: theme.accent,
            borderRadius: keyboardVisible ? 15 : 20,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 8
          }}>
            <Text style={{
              fontSize: keyboardVisible ? 24 : 32,
              color: 'white',
              fontWeight: '700'
            }}>
              📊
            </Text>
          </View>

          <Text style={{
            fontSize: keyboardVisible ? 24 : 28,
            fontWeight: '700',
            color: theme.text,
            marginBottom: 8
          }}>
            Welcome to BusinessApp
          </Text>

          <Text style={{
            fontSize: 16,
            color: theme.textSecondary,
            textAlign: 'center',
            marginBottom: 20
          }}>
            {isSignUp ? 'Create your account to get started' : 'Sign in to your account'}
          </Text>

          {/* Mode Toggle */}
          <View style={{
            flexDirection: 'row',
            backgroundColor: theme.cardBg,
            borderRadius: 25,
            padding: 4,
            borderWidth: 1,
            borderColor: theme.border
          }}>
            <TouchableOpacity
              onPress={() => !isSignUp && toggleMode()}
              style={{
                paddingHorizontal: 24,
                paddingVertical: 8,
                borderRadius: 20,
                backgroundColor: !isSignUp ? theme.accent : 'transparent'
              }}
            >
              <Text style={{
                color: !isSignUp ? 'white' : theme.textSecondary,
                fontWeight: '600',
                fontSize: 14
              }}>
                Sign In
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => isSignUp && toggleMode()}
              style={{
                paddingHorizontal: 24,
                paddingVertical: 8,
                borderRadius: 20,
                backgroundColor: isSignUp ? theme.accent : 'transparent'
              }}
            >
              <Text style={{
                color: isSignUp ? 'white' : theme.textSecondary,
                fontWeight: '600',
                fontSize: 14
              }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Form */}
        <View style={{
          backgroundColor: theme.cardBg,
          borderRadius: 16,
          padding: 24,
          borderWidth: 1,
          borderColor: theme.border,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
          marginBottom: 24
        }}>
          {/* Name Field (Sign Up only) */}
          {isSignUp && (
            <View style={{ marginBottom: 20 }}>
              <Text style={{
                fontSize: 14,
                fontWeight: '600',
                color: theme.text,
                marginBottom: 8
              }}>
                Full Name
              </Text>
              <TextInput
                value={formData.name}
                onChangeText={(text) => handleInputChange('name', text)}
                placeholder="Enter your full name"
                placeholderTextColor={theme.textSecondary}
                style={{
                  padding: 16,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: theme.border,
                  backgroundColor: theme.bg,
                  fontSize: 16,
                  color: theme.text
                }}
              />
            </View>
          )}

          {/* Email Field */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{
              fontSize: 14,
              fontWeight: '600',
              color: theme.text,
              marginBottom: 8
            }}>
              Email Address
            </Text>
            <TextInput
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              placeholder="Enter your email"
              placeholderTextColor={theme.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
              style={{
                padding: 16,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: theme.border,
                backgroundColor: theme.bg,
                fontSize: 16,
                color: theme.text
              }}
            />
          </View>

          {/* Password Field */}
          <View style={{ marginBottom: isSignUp ? 20 : 24 }}>
            <Text style={{
              fontSize: 14,
              fontWeight: '600',
              color: theme.text,
              marginBottom: 8
            }}>
              Password
            </Text>
            <View style={{ position: 'relative' }}>
              <TextInput
                value={formData.password}
                onChangeText={(text) => handleInputChange('password', text)}
                placeholder="Enter your password"
                placeholderTextColor={theme.textSecondary}
                secureTextEntry={!showPassword}
                style={{
                  padding: 16,
                  paddingRight: 50,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: theme.border,
                  backgroundColor: theme.bg,
                  fontSize: 16,
                  color: theme.text
                }}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: 16,
                  top: 18
                }}
              >
                <Text style={{
                  fontSize: 16,
                  color: theme.textSecondary
                }}>
                  {showPassword ? '🙈' : '👁️'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password (Sign Up only) */}
          {isSignUp && (
            <View style={{ marginBottom: 24 }}>
              <Text style={{
                fontSize: 14,
                fontWeight: '600',
                color: theme.text,
                marginBottom: 8
              }}>
                Confirm Password
              </Text>
              <TextInput
                value={formData.confirmPassword}
                onChangeText={(text) => handleInputChange('confirmPassword', text)}
                placeholder="Confirm your password"
                placeholderTextColor={theme.textSecondary}
                secureTextEntry={!showPassword}
                style={{
                  padding: 16,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: theme.border,
                  backgroundColor: theme.bg,
                  fontSize: 16,
                  color: theme.text
                }}
              />
            </View>
          )}

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={loading}
            style={{
              backgroundColor: loading ? theme.border : theme.accent,
              paddingVertical: 16,
              borderRadius: 12,
              alignItems: 'center',
              marginBottom: 16
            }}
          >
            <Text style={{
              color: 'white',
              fontSize: 16,
              fontWeight: '700'
            }}>
              {loading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </Text>
          </TouchableOpacity>

          {/* Forgot Password (Sign In only) */}
          {!isSignUp && (
            <TouchableOpacity style={{ alignItems: 'center' }}>
              <Text style={{
                color: theme.accent,
                fontSize: 14,
                fontWeight: '500'
              }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Skip Option */}
        <View style={{
          backgroundColor: theme.cardBg,
          borderRadius: 16,
          padding: 20,
          borderWidth: 1,
          borderColor: theme.border,
          alignItems: 'center'
        }}>
          <Text style={{
            fontSize: 14,
            color: theme.textSecondary,
            textAlign: 'center',
            marginBottom: 16
          }}>
            Want to explore the app first?
          </Text>
          
          <TouchableOpacity
            onPress={onSkip}
            style={{
              backgroundColor: 'transparent',
              borderWidth: 2,
              borderColor: theme.accent,
              paddingVertical: 12,
              paddingHorizontal: 32,
              borderRadius: 12,
              alignItems: 'center'
            }}
          >
            <Text style={{
              color: theme.accent,
              fontSize: 16,
              fontWeight: '600'
            }}>
              Skip for Now
            </Text>
          </TouchableOpacity>

          <Text style={{
            fontSize: 12,
            color: theme.textSecondary,
            textAlign: 'center',
            marginTop: 12
          }}>
            You can sign in later to save your data
          </Text>
        </View>

        {/* Demo Credentials */}
        <View style={{
          marginTop: 24,
          padding: 16,
          backgroundColor: theme.accent + '10',
          borderRadius: 12,
          borderWidth: 1,
          borderColor: theme.accent + '30'
        }}>
          <Text style={{
            fontSize: 12,
            color: theme.accent,
            fontWeight: '600',
            marginBottom: 8,
            textAlign: 'center'
          }}>
            Demo Credentials
          </Text>
          <Text style={{
            fontSize: 11,
            color: theme.textSecondary,
            textAlign: 'center'
          }}>
            Email: demo@businessapp.com • Password: demo123
          </Text>
        </View>
      </Animated.View>
    </ScrollView>
  );
};

export default LoginScreen;
