
import React, {useState, useEffect} from "react";
import {StyleSheet, Text, TouchableOpacity, View, ImageBackground} from "react-native" ;
import { GameEngine } from "react-native-game-engine";
import restart from '../entities/index';
import Physics from "../components/physics" ; 
import entities from "../entities/index";

export default function Game() {
    const [running, setRunning] = useState(false)
    const [gameEngine, setGameEngine] = useState(null)
    const [points, setPoints] = useState(0)

    useEffect(() => {
        setRunning(false)
    }, [])

    return (
        <ImageBackground style={styles.background}
        source={require("../assets/sky.png")}
        resizeMode="cover"
        >
            <Text style={{textAlign: "center", fontSize: 40,
                fontWeight:"bold", margin: 20
            }}>{points}</Text>
            <GameEngine
                ref={(ref) => (setGameEngine(ref))}
                systems={[Physics]}
                entities={restart()}
                running= {running}
                onEvent={(e) => {
                    switch(e.type){
                        case "game_over":
                            setRunning(false)
                            gameEngine.stop()
                            setPoints(0)
                            break;
                        case "new_point":
                            setPoints(points + 1)
                            break ; 
                    }
                }}
                style={{
                    flex: 1, 
                    top: 0,
                    left: 0, 
                    right: 0, 
                    bottom: 0
                }}>
            </GameEngine>
            {!running ?
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <TouchableOpacity style={{backgroundColor: "black", paddingHorizontal: 30 }} 
                onPress={() => {
                    setPoints(0)
                    setRunning(true)
                    gameEngine.swap(entities())
                }}>
                    <Text style={{fontWeight: "bold", fontSize: 40, color: "pink"}}>
                        Start Game
                    </Text>
                </TouchableOpacity>



            </View> : null
            
        
        }
        </ImageBackground>

    ) ; 
    
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
    },
  });