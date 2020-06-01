import React from "react"
import { View, ImageBackground, Image, Text, TouchableOpacity } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"
import ActionSheet from "react-native-actionsheet"
import ImagePicker from "react-native-image-picker"
import CustomModal from "../components/CustomModal"
import dft from "../images/book.jpg"
import bg from "../images/info-bg.jpg"
import { HOST } from "../env"

const options = [
    <Text style={{ color: "#147EFB", fontSize: 18 }}>Take Photo</Text>,
    <Text style={{ color: "#147EFB", fontSize: 18 }}>Choose From Photos</Text>,
    "Cancel"
]

export default class UserNameBlock extends React.Component {
    state = {
        url: "",
        avatarSource: null,
        modalVisible: false
    }

    showActionSheet = () => {
        this.ActionSheet.show()
    }

    componentDidMount() {
        this.getData();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.userEmail === this.props.userEmail && nextState.url === this.state.url && nextState.avatarSource === this.state.avatarSource) {
            return false
        }
        return true
    }

    componentDidUpdate() {
        this.getData();
    }

    getData = async () => {
        const { userEmail } = this.props;
        fetch(`${HOST}/api/users`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userEmail
            })
        }).then(res => res.json())
        .then(json => {
            if (json.success) {
                if (json.user[0]) {
                    this.setState({
                        url: json.user[0].imageUrl
                    })
                }
                else {
                    this.setState({
                        url: "",
                        avatarSource:null
                    })
                }
            }
        })
    }

    onActionSelectPhotoDone = (index) => {
        const options = {
            title: "Select Avatar",
            storageOptions: {
                skipBackup: true,
                path: "images",
            },
        };
        switch (index) {
            case 0:
                ImagePicker.launchCamera(options, (response) => {
                    if (response.didCancel) {
                        console.log('User cancelled image picker');
                    } else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                    } else if (response.customButton) {
                        console.log('User tapped custom button: ', response.customButton);
                    } else {
                        this.setState({
                            avatarSource: response,
                            modalVisible: true
                        })
                        this.updateImage();
                    }
                })
                break;
            case 1:
                ImagePicker.launchImageLibrary(options, (response) => {
                    if (response.didCancel) {
                        console.log('User cancelled image picker');
                    } else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                    } else if (response.customButton) {
                        console.log('User tapped custom button: ', response.customButton);
                    } else {
                        this.setState({
                            avatarSource: response,
                            modalVisible: true
                        })
                        this.updateImage();
                    }
                })
                break;
            default:
                break;
        }
    }

    updateImage = () => {
        const { avatarSource } = this.state;
        const { userEmail } = this.props;
        let formData = new FormData();
        formData.append("avatar", {
            uri: avatarSource.uri,
            type: avatarSource.type,
            name: avatarSource.fileName
        });
        formData.append("userEmail", userEmail);
        fetch(`${HOST}/api/users/updateImage`, {
            method: "POST",
            headers: new Headers({
                "Content-category": "multipart/form-data"
            }),
            body: formData
        })
        .then(res => res.json())
    }

    render() {
        const { url, avatarSource, modalVisible } = this.state;
        const { userEmail } = this.props;
        return (
            <View style={styles.container}>
                {/* <CustomModal 
                    title="avatar updated!"
                    btnText="ok"
                    visible={modalVisible}
                    onPress={this.updateImage}
                /> */}
                <ImageBackground style={styles.bg} source={bg}>
                    <TouchableOpacity 
                        style={styles.imgCtn}
                        onPress={this.showActionSheet}
                        activeOpacity={.7}
                        disabled={!userEmail ? true : false}
                    >
                    {
                        url
                        ? <Image style={styles.img} source={{ uri: url }} />
                        : avatarSource 
                            ? <Image style={styles.img} source={avatarSource} />
                            : <Image style={styles.img} source={dft}/>
                    }
                    </TouchableOpacity>
                    { userEmail
                        ?   <View style={styles.greeting}>
                                <Text style={styles.hi}>Welcome back,</Text>
                                <Text style={styles.userName}>{userEmail.split("@")[0] || "new member"}</Text>
                            </View>
                        :   <View style={styles.greeting}>
                                <Text style={styles.hi}>Hi there!</Text>
                            </View>
                    } 
                </ImageBackground>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={"Avatar"}
                    options={options}
                    cancelButtonIndex={2}
                    destructiveButtonIndex={1}
                    onPress={index => {
                        this.onActionSelectPhotoDone(index);
                    }}
                />
            </View>
        )
    }
}

const styles = EStyleSheet.create({
    container: {
        marginTop: "10rem",
        width: "90%",
        alignSelf: "center",
        aspectRatio: 1/0.45, 
        borderRadius: 30, 
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 2,
        overflow: "hidden"
    },
    bg: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    imgCtn: {
        borderRadius: 99,
        marginLeft: "8rem",
        position: "relative"
    },
    img: {
        width: "20rem",
        height: "20rem",
        borderRadius: 99
    },
    icon: {
        position: "absolute",
        right: "1rem",
        bottom: "-1rem"
    },
    greeting: {
        marginLeft: "5rem",
        marginRight: "2rem",
        flexShrink: 1
    },
    hi: {
        fontSize: "5.2rem",
        fontStyle: "italic",
        fontWeight: "700"
    },
    userName: {
        fontSize: "7.2rem",
        fontWeight: "700"
    }
}) 