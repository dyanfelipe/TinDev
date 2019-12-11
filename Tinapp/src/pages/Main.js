import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

import logo from '../assets/logo.png';
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import matchimage from '../assets/itsamatch.png';
import io from 'socket.io-client';

export default function Main({ navigation }) {
  const id = navigation.getParam('user');
  const [users, setUsers] = useState([]);
  const [matchDev, setMatchDev] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/devs', {
        headers: {
          user: id,
        },
      });
      setUsers(response.data);
    }

    loadUsers();
  }, [id]);

  useEffect(() => {
    const socket = io('http://localhost:3333', {
      query: { users: id }
    });
    socket.on('match', dev => {
      setMatch(dev)
    })
  }, [id]);

  async function handlelike() {
    const [user, ...rest] = users;

    await api.post(`/devs/${user._id}/likes`, null, {
      headers: { user: id },
    });
    setUsers(rest);
  }

  async function handleDislike() {
    const [user, ...rest] = users;
    await api.post(`/devs/${user._id}/dislikes`, null, {
      headers: { user: id },
    });
    setUsers(rest);
  }

  async function handleLogout(params) {
    await AsyncStorage.clear();
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Image style={styles.logo} source={logo} />
      </TouchableOpacity>

      <View style={styles.cardsConteriner}>
        {users.length === 0
          ? <Text style={styles.empty}>Acabou:(</Text>
          : (
            users.map((user, index) => (
              <View key={user._id} style={[styles.card, { zIndex: users.length - index }]}>
                <View style={styles.footer}>
                  <Image style={styles.avatar} source={{ uri: user.avatar }} />
                  <Text style={styles.name}>{user.name}</Text>
                  <Text style={styles.bio} numberOfLines={3}>{user.bio}</Text>
                </View>
              </View>
            ))
          )}
      </View>
      {users.length > 0 && (
        <View style={styles.BottonsConteiner}>
          <TouchableOpacity style={styles.button} onPress={handleDislike}>
            <Image source={dislike} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handlelike}>
            <Image source={like} />
          </TouchableOpacity>
        </View>
      )}
      {matchDev && (
        <View style={styles.matchConteiner}>
          <Image source={matchimage} />
          <Image style={styles.Matchavatar} source={{ uri: 'https://avatars0.githubusercontent.com/u/32774948?s=460&v=4' }} />
          <Text style={styles.matchName}>Name do usuario</Text>
          <Text style={styles.matchBio}> descrição lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll</Text>
          <TouchableOpacity onPress={() => setMatchDev(null)}>
            <Text style={styles.closeMatch}>Fechar</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    marginTop: 50,
  },
  empty: {
    alignSelf: 'center',
    color: '#999',
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardsConteriner: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    maxHeight: 500,
  },
  card: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    margin: 30,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  avatar: {
    flex: 1,
    height: 300,
  },
  footer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  bio: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
    lineHeight: 18,
  },
  BottonsConteiner: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    elevation: 10,
    //IOS
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    }
  },
});