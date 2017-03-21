<View style={[styles.scene, styles.presentation]}>
	<Image source={require('./../images/bg-presentation-2.jpg')} style={styles.presentationTop}>
		<View style={styles.header}>
			<View style={styles.headerLeft}>
				<TouchableOpacity
					style={styles.btn}
					onPress={() => this.props.navigator.pop()}
					activeOpacity={75 / 50}>
					<Icon style={[styles.btnIcon, styles.primary]} size={20} name="arrow-back"/>
					<Text style={[styles.btnText, styles.primary]}>{t.back}</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.headerCenter}>
				<Image
					style={[ styles.logoHeader ]}
					source={require('./../images/logo-header.png')}
				/>
			</View>
			<View style={styles.headerRight}>
			</View>
		</View>
		<View style={styles.last}>
			<Text style={styles.presentationText}>Продавец осуществляет продажи и отправляет SMS c индивидуальным кодом упаковки на специальный номер Rovese</Text>
			<View style={styles.tabs}>
				<TouchableOpacity style={styles.tab}>
					<Text style={styles.tabText}>Продажа</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.tab}>
					<Text style={[styles.tabText, styles.tabTextActive]}>Отправка SMS</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.tab}>
					<Text style={styles.tabText}>Бонусы</Text>
				</TouchableOpacity>
			</View>
		</View>
	</Image>
	<Image source={require('./../images/presentation-1.jpg')} style={styles.presentationBottom}>
	</Image>
</View>