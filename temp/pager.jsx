<View style={[styles.col, styles.middle]}>
						<ViewPagerAndroid
							style={styles.slider}
							initialPage={0}>
							<View style={styles.slide}>
								<View style={styles.slidePage}>
									<Text>First page</Text>
								</View>
							</View>
							<View style={styles.slide}>
								<View style={styles.slidePage}>
									<Text>Second page</Text>
								</View>
							</View>
						</ViewPagerAndroid>
					</View>




<View style={[styles.col, styles.middle]}>
						<ViewPager
							dataSource={this.state.dataSource}
							renderPage={this.renderSlide}
							initialPage={0}
							isLoop={true}
							/>
					</View>